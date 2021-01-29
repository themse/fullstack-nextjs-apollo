import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { buildGraphbackAPI } from 'graphback';
import getConfig from 'next/config';
import { migrateDB } from 'graphql-migrations';
import { loadConfigSync } from 'graphql-config';

import { provider, loadDbConfig } from './services/datasource';
import { GraphbackExtension } from './services/extensions';

const {
  serverRuntimeConfig: { APOLLO_SERVER_PORT },
} = getConfig();

const app = express();
app.use(cors());

const config = loadConfigSync({
  extensions: [GraphbackExtension.declaration],
});

const project = config.getDefault();
const graphbackConfig = project.extension(GraphbackExtension.name);
const modelDefs = project.loadSchemaSync(graphbackConfig.model);

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(modelDefs, {
  dataProviderCreator: provider,
});

migrateDB(loadDbConfig(), typeDefs, {
  // operationFilter: removeNonSafeOperationsFilter
})
  .then(() => console.info('Migrated database!'))
  .catch((error) => console.error('Error with migration: ', error.message));

const apolloServer = new ApolloServer({
  typeDefs,
  /* INFO: here you can add some custom resolvers */
  resolvers: [resolvers],
  context: contextCreator,
});

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

app.listen({ port: APOLLO_SERVER_PORT }, () => {
  console.info(`🚀 Apollo Server on http://localhost:${APOLLO_SERVER_PORT}/graphql`);
});
