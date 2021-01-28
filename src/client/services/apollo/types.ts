import { IncomingMessage, ServerResponse } from 'http';

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};
