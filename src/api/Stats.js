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
    return [
      {
        name: "Banano Casino",
        website: "https://banano.casino",
        amountOfRequests: Math.floor(Math.random() * 1000)
      },
      {
        name: "Service",
        website: "https://service.com",
        amountOfRequests: Math.floor(Math.random() * 1000)
      }
    ];
  }
};
