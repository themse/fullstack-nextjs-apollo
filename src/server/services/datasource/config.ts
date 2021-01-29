import Knex, { StaticConnectionConfig } from 'knex';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { DB_CLIENT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD },
} = getConfig();

export interface ConfigInterface extends Knex.Config {
  connection: StaticConnectionConfig;
}

const defaultConfig: ConfigInterface = {
  client: 'pg',
  connection: {
    database: 'db',
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin',
  },
  pool: {
    min: 5,
    max: 30,
  },
};

const connection: ConfigInterface = {
  ...(DB_NAME && { database: DB_NAME }),
  ...(DB_HOST && { host: DB_HOST }),
  ...(DB_PORT && { port: DB_PORT }),
  ...(DB_USER && { user: DB_USER }),
  ...(DB_PASSWORD && { password: DB_PASSWORD }),
};

export default (): ConfigInterface => {
  return {
    client: DB_CLIENT || defaultConfig.client,
    connection: { ...defaultConfig.connection, ...connection },
    pool: defaultConfig.pool,
  };
};
