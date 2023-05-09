import { gql } from "@apollo/client";

export const STATS_QUERY = gql`
  query {
    stats {
      connectedWorkers
      totalPaidBanano
      registeredServiceCount
      top10 {
        banAddress
        totalPaidBanano
      }
      services {
        name
        website
        requests
      }
    }
  }
`;
