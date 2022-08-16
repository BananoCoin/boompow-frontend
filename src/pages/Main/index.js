import React from "react";
import Stats from "api/Stats.js";
import { useMainStore } from "stores";

import TotalContributors from "./TotalContributors";
import TotalPaid from "./TotalPaid";
import TotalRegistered from "./TotalRegistered";
import TotalConnected from "./TotalConnected";
import { Skeleton } from "components/Skeleton";

const Main = () => {
  const { stats, setStats } = useMainStore();

  const refreshStats = async () => {
    const nStats = Stats.get();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // SIMULATE NETWORK DELAY
    setStats(nStats);
  };

  React.useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="w-full max-w-5xl h-full flex flex-col items-center text-gray-100 font-semibold text-2xl">
      <div className="mb-6 flex gap-6 flex-col mt-8 sm:flex-row">
        <TotalPaid amount={stats?.totalPaid} />
        <TotalConnected amount={stats?.totalConnected} />
        <TotalRegistered amount={stats?.registeredServices} />
      </div>
      {stats !== null && (
        <div className="flex">
          <TotalContributors stats={stats} />
        </div>
      )}
    </div>
  );
};

export default Main;
