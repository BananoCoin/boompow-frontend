import { gql } from "@apollo/client";

export const STATS_SUBSCRIPTION = gql`
  subscription {
    stats {
      connectedWorkers
      totalPaidBanano
      registeredServiceCount
      top10 {
        banAddress
        totalPaidBanano
      }
    }
  }
`;
