import { GraphQLExtensionDeclaration } from 'graphql-config';

const EXTENTION_NAME = 'graphback';

type GraphbackExtensionType = {
  name: string;
  declaration: GraphQLExtensionDeclaration;
};

const declaration: GraphQLExtensionDeclaration = (_api) => {
  return {
    name: EXTENTION_NAME,
  };
};

export const GraphbackExtension: GraphbackExtensionType = {
  name: EXTENTION_NAME,
  declaration,
};
