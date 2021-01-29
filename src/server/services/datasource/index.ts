import Knex from 'knex';
import { createKnexDbProvider } from '@graphback/runtime-knex';

import loadDbConfig from './config';

const knex = Knex(loadDbConfig());
const provider = createKnexDbProvider(knex);

export { provider, loadDbConfig };
