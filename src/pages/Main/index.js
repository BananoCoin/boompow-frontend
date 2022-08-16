import React from "react";
import Stats from "api/Stats.js";
import { useMainStore } from "stores";

import TotalContributors from "./TotalContributors";

const Main = () => {
  const { stats, setStats } = useMainStore();

  const refreshStats = async () => {
    const nStats = Stats.get();
    setStats(nStats);
  };

  React.useEffect(() => {
    refreshStats();
  }, []);

  return (
    <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center text-gray-100 font-semibold text-2xl">
      <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-80">
        {stats !== null && <TotalContributors stats={stats} />}
      </div>
    </div>
  );
};

export default Main;
