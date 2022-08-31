import React from "react";
import { Skeleton } from "components/Skeleton";
import { formatBan } from "components/Banano";
import { useMainStore } from "stores";

// https://stackoverflow.com/a/39466341
// Get Ordinal Suffix
function nth(n) {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
}

const Services = () => {
  const { stats } = useMainStore();

  return (
    <div className="text-gray-200 bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-full max-w-3xl drop-shadow-lg shadow-black">
      <div className="p-4 font-bold">Top Contributors</div>
      <div className="h-[700px] overflow-y-scroll">
        <div className="text-sm ">
          {stats?.topContributors ? (
            <React.Fragment>
              {stats.topContributors.map((c, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 border-b border-banano-gray-dark first:border-t last:border-b p-4 flex justify-between"
                  >
                    <div className="flex">
                      <img
                        src={`https://monkey.banano.cc/api/v1/monkey/${c.banAddress}`}
                        alt="avatar"
                        width="48px"
                        height="48px"
                        className="rounded-full bg-banano-gray-dark"
                      />
                      <div className="flex flex-col ml-4 justify-between">
                        <div className="text-gray-300">
                          <a
                            href={`https://creeper.banano.cc/account/${c.banAddress}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="sm:hidden">
                              {c.banAddress.substr(0, 13)}...
                            </span>
                            <span className="hidden sm:block">
                              {c.banAddress}
                            </span>
                          </a>
                        </div>
                        <div>{formatBan(c.totalPaidBanano)}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium tabular-nums">
                      <div>
                        {index + 1}
                        {nth(index + 1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {new Array(10).fill({}).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 border-b border-banano-gray-dark first:border-t last:border-b p-4 flex justify-between"
                  >
                    <div className="flex">
                      <Skeleton size="rounded-full bg-banano-gray-dark h-[48px] w-[48px]" />
                      <div className="flex flex-col ml-4 justify-between">
                        <div className="text-gray-300">
                          <span className="sm:hidden">
                            <Skeleton text="ban_1boompow1..." />
                          </span>
                          <span className="hidden sm:block">
                            <Skeleton text="ban_1boompow14irck1yauquqypt7afqrh8b6bbu5r93pc6hgbqs7z6o99frcuym" />
                          </span>
                        </div>
                        <div>
                          <Skeleton text="BAN 10,000.00" />
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 font-medium">
                      <div>
                        <Skeleton text="1st" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
