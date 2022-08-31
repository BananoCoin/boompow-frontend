import React from "react";
import { STATS_SUBSCRIPTION } from "api/Stats.js";
import TopContributors from "./TopContributors";
import TotalConnected from "./TotalConnected";
import TotalPaid from "./TotalPaid";
import TotalRegistered from "./TotalRegistered";
import { useMainStore } from "stores";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const { stats } = useMainStore();

  return (
    <div className="w-full max-w-5xl h-full flex flex-col items-center text-gray-100 font-semibold text-2xl">
      <div className="mb-6 flex gap-6 flex-col mt-8 md:mt-16 md:flex-row w-full justify-center items-center whitespace-nowrap">
        <TotalPaid amount={stats?.totalPaidBanano} />
        <TotalConnected amount={stats?.totalConnected} />
        <TotalRegistered amount={stats?.registeredServiceCount} />
      </div>
      <div className="flex flex-col md:flex-row mt-2 pb-8 md:mt-24 md:justify-between max-w-6xl items-center">
        <TopContributors topContributors={stats?.topContributors} />
        <div className="mt-4 md:w-7/12">
          <div className="text-3xl mt-6 md:mt-0 font-bold">
            What is BoomPOW?
          </div>
          <p className="text-base text-gray-300 mt-4 font-normal">
            BoomPOW lets you earn bananos by generating proof of work for the
            Banano and Nano networks using your computer. If you are a
            developer, you may also register a service to request PoW completely
            free of charge.
          </p>
          <div className="mt-4 w-full flex justify-start items-center gap-4 font-bold [&>*]:py-2 [&>*]:px-2 [&>*]:text-sm [&>*]:my-4 [&>*]:transition-colors [&>*]:rounded-md">
            <button
              className={`bg-banano-yellow hover:bg-accent-secondary text-gray-900 flex justify-center items-center gap-1`}
              onClick={(e) => {
                setSearchParams("?modal=register&type=provider");
              }}
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Register Provider
            </button>
            <button
              className={`bg-banano-yellow hover:bg-accent-secondary text-gray-900 flex justify-center items-center gap-1`}
              onClick={(e) => {
                setSearchParams("?modal=register&type=service");
              }}
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Register Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
