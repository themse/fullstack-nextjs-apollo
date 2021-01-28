import { gql } from '@apollo/client';

export const getVendors = gql`
  query getVendors {
    vendors {
      items {
        id
        status
        profile {
          id
          name
        }
      }
    }
  }
`;
