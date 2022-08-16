// import { useQuery, gql } from "@apollo/client"; // * IMPLEMENT APOLLO LATER

import { faker } from "@faker-js/faker";

const generateDummyContributors = () => {
  let contributors = [];
  for (let i = 0; i < 5; i++) {
    contributors.push({
      name: faker.internet.userName(),
      totalPaid: 95137 - i * 9135,
      kaliumImg:
        "https://monkey.banano.cc/api/v1/monkey/ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym",
    });
  }
  return contributors;
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
