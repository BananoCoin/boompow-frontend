import React from "react";
import Stats from "api/Stats.js";
import { useMainStore } from "stores";

import TopContributors from "./TopContributors";
import TotalPaid from "./TotalPaid";
import TotalRegistered from "./TotalRegistered";
import TotalConnected from "./TotalConnected";

const Main = () => {
  const { stats, setStats } = useMainStore();

  const refreshStats = async () => {
    const nStats = Stats.get();
    await new Promise((resolve) => setTimeout(resolve, 450)); // SIMULATE NETWORK DELAY
    setStats(nStats);
  };

  React.useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="w-full max-w-5xl h-full flex flex-col items-center text-gray-100 font-semibold text-2xl">
      <div className="mb-6 flex gap-6 flex-col mt-8 md:mt-16 md:flex-row w-full justify-center items-center whitespace-nowrap">
        <TotalPaid amount={stats?.totalPaid} />
        <TotalConnected amount={stats?.totalConnected} />
        <TotalRegistered amount={stats?.registeredServices} />
      </div>
      <div className="flex flex-col md:flex-row mt-16 md:mt-24 md:justify-between max-w-4xl">
        <TopContributors stats={stats} />
        <div className="mt-16 md:w-1/2">
          <div className="text-center text-3xl">What is BoomPOW?</div>
          <p className="text-base text-gray-300 mt-4">
            Banano transactions require a "proof of work" in order to be
            broadcasted and confirmed on the network. BoomPOW lets you earn
            bananos by generating proof of work using your computer. You may
            also request PoW for your service, completely free of charge!
          </p>
          <div className="mt-12 text-center text-3xl">
            Great! I'd Like To Register
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <button
              className={`bg-banano-yellow border-b-4 border-accent hover:bg-accent-secondary rounded-md py-2 px-4 transition-colors text-gray-900 font-bold text-sm my-4`}
              onClick={(e) => {
                // DO SOMETHING.
                // TODO: MAYBE SOME INSTRUCTIONS FOR DOWNLOADING BOOMPOW AND SETTING IT UP.
              }}
            >
              Register Provider
            </button>
            <button
              className={`bg-banano-yellow border-b-4 border-accent hover:bg-accent-secondary rounded-md py-2 px-4 transition-colors text-gray-900 font-bold text-sm my-4`}
              onClick={(e) => {
                // DO SOMETHING.
                // TODO: MAYBE SOME INSTRUCTIONS FOR DOWNLOADING BOOMPOW AND SETTING IT UP.
              }}
            >
              Register Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
