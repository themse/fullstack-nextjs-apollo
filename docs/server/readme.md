# Backend Documentation

## Graphback PostgreSQL + Apollo Server Template

A template that provides you with an easy setup for your application's backend using PostgreSQL and Apollo server with TypeScript.

### Quickstart Guide

Run the project using the following steps:

- Rename file with environment variables

```
$ mv .env-dist .env
```

- Start the database

```
$ make up
```

or

```
$ docker-compose up -d
```

- Inspect your schema in the `src/server/services/graphql/models/**/*.graphql` files.
- Start the server

```
$ npm run server:dev
```

Or, if using yarn

```
$ yarn server:dev
```

For more on customizing your Graphback application, check out [graphback docs](https://graphback.dev/docs/introduction)

If your project contains the client application then please follow [`docs/client/readme.md`](../client/readme.md) for info regarding running the client-side.

### Dependencies and Tools

The following tools and technologies have been used to create this template:

- [GraphQL](https://graphql.org/): GraphQL is an open-source data query and manipulation language for APIs which was publically released by Facebook in 2015.

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/): Apollo Server provides a way to simplify building the GraphQL server. It can be used with several popular libraries for Node.js like Express, Koa, Hapi. Here we have used it with Express.

- [Express](https://expressjs.com/): Express is a minimal and flexible Node.js web application framework that makes building a Node.js server easier by providing a wide range of features.

- [GraphQL Code Generator](https://graphql-code-generator.com/): GraphQL Code Generator is a tool that generates code out of your GraphQL schema by analyzing it.

- [PostgreSQL](https://www.postgresql.org/): PostgreSQL, also known as Postgres, is a popular open-source relational SQL database.

### Project structure

The project contains the following set of source files.

- `.graphlrc.yml` - file defining the configuration like the path to business model declaration, how to perform code generation from the GraphQL types to Typescript types etc. The configuration file is defined using the GraphQL project using [`graphql-config`](https://graphql-config.com/introduction).

- `docker-compose.yml` - file to spin up the database if you do not have a running instance.

- `Makefile` - file with aliases of the main docker commands.

- `.env` - file that contains different environment variables.

- `src/server` - folder which has:

  - `index.ts` - file that configures and starts a [Graphback application.]

  - `services` - folder which has:

    - `datasource` - folder with files which indicates how to start a database connection.
    - `extensions` - extensions which extend the behavior of GraphQL Config's logic ([more details](https://graphql-config.com/extensions))
    - `graphql` - folder which has:
      - `model` - folder, which contains a GraphQL schema file defining your [business models](https://graphback.dev/docs/model/datamodel). This file can be edited to suit your needs.
      - `resolvers` - folder where you can declare your custom resolvers to suit your use cases. See [Custom Resolvers guide](https://graphback.dev/docs/resolvers/custom-resolvers) for more information.

- `common/graphql` folder that contains generated schema files. It's advised to not edit these files manually. See [Generating types.](#re-generating-types-from-schema)

  - `my-schema.graphql` - file which generated according to your models.
  - `general-schema.graphql` - file which contains all schemas you have (even external).

> NOTE: All the files can be edited according to your needs except for those that are generated (no need to edit them as they'll be re-generated anyway).

### Updating the business model

If you made changes to your business model, it's advised to regenerate shemas.

```
$ yarn generate
```

This will update the generated `my-schema.graphql` file.

Running `yarn generate` executes a script which relies on [Graphback CLI](https://graphback.dev/docs/cli/graphback-cli).

> NOTE: You have to run the above commands on each modification of your business model on the server-side. This ensures that the client is kept in sync with changes on the server-side.

### GraphQL Schema File Generation

A GraphQL schema describes the functionality available to the client applications that connect to it. The [Graphback CLI](https://graphback.dev/docs/cli/graphback-cli) is used to run the `graphback generate` command which executes the generation process to create a graphql schema. This schema is stored in the `my-schema.graphql` file.

![Diagram explaining the process](../readme-diagram.png)
