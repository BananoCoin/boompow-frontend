// import { useQuery, gql } from "@apollo/client"; // * IMPLEMENT APOLLO LATER

const generateDummyContributors = () => {
  let topContributors = [];
  for (let i = 0; i < 5; i++) {
    let walletAddress =
      "ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym";
    topContributors.push({
      totalPaid: 95137 - i * 9135,
      walletAddress,
      monkeyImg: `https://monkey.banano.cc/api/v1/monkey/${walletAddress}?size=100`,
    });
  }
  return topContributors;
};

const Stats = {
  get: () => {
    return {
      totalPaid: 4120247,
      totalConnected: 138,
      registeredServices: 2398,
      topContributors: generateDummyContributors(),
    };
  },
};

export default Stats;
