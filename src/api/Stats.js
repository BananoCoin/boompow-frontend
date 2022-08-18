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

export default {
  services: async () => {
    return new Array(150).fill({
      name: "Banano Casino",
      website: "https://banano.casino",
      amountOfRequests: Math.floor(Math.random() * 1000)
    });
  }
};
