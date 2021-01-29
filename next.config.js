/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  webpack: {
    // webpack config properties
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    DB_CLIENT: process.env.DB_CLIENT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.POSTGRES_DB,
    DB_USER: process.env.POSTGRES_USER,
    DB_PASSWORD: process.env.POSTGRES_PASSWORD,

    APOLLO_SERVER_PORT: process.env.APOLLO_SERVER_PORT || 4000,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.APP_URL,
    GRAPHQL_SCHEMA_PATH: process.env.GRAPHQL_SCHEMA_PATH,
  },
};
module.exports = withPlugins([withBundleAnalyzer], nextConfig);
