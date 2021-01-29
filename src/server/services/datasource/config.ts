import Knex, { PgConnectionConfig } from 'knex';

export interface ConfigInterface extends Knex.Config {
  connection: PgConnectionConfig;
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

// TODO fix ts error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const connection: PgConnectionConfig = {
  ...(process.env.DB_HOST && { host: process.env.DB_HOST }),
  ...(process.env.DB_PORT && { port: process.env.DB_PORT }),
  ...(process.env.POSTGRES_DB && { database: process.env.POSTGRES_DB }),
  ...(process.env.POSTGRES_USER && { user: process.env.POSTGRES_USER }),
  ...(process.env.POSTGRES_PASSWORD && { password: process.env.POSTGRES_PASSWORD }),
};

export default (): ConfigInterface => {
  return {
    client: process.env.DB_CLIENT || defaultConfig.client,
    connection: { ...defaultConfig.connection, ...connection },
    pool: defaultConfig.pool,
  };
};
