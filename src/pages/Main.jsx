import React from "react";
import Stats from "api/Stats.js";
import { useMainStore } from "stores";

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
    <div className="w-full max-w-5xl h-full flex flex-col justify-center items-center text-gray-100 font-semibold text-3xl">
      <span>Main Page</span>
    </div>
  );
};

export default Main;
