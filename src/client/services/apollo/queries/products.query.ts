import { gql } from '@apollo/client';

export const getAllProducts = gql`
  query getAllProducts {
    getAllProducts {
      title
      description
      discount
    }
  }
`;
