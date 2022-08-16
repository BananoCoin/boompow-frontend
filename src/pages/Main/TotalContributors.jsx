import React from "react";
import { formatBan } from "components/Banano";

const TotalContributors = ({ stats }) => {
  return (
    <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-80 shadow-sm shadow-black">
      <div className="p-4">Top Contributors</div>
      <div>
        <div className="text-sm">
          {stats.topContributors.map((c, index) => {
            return (
              <div
                key={index}
                className="py-4 border-b border-banano-gray-dark first:border-t last:border-b p-4 flex justify-between"
              >
                <div className="flex">
                  <img
                    src={c.monkeyImg}
                    width="48px"
                    height="48px"
                    className="rounded-full bg-banano-gray-dark"
                  />
                  <div className="flex flex-col ml-4 justify-between">
                    <div className="text-gray-300">
                      {c.walletAddress.substr(0, 13)}...
                    </div>
                    <div>{formatBan(c.totalPaid)}</div>
                  </div>
                </div>
                <div className="text-gray-400 font-medium">
                  <div>
                    {index === 0
                      ? "1st"
                      : index === 1
                      ? "2nd"
                      : index === 2
                      ? "3rd"
                      : `${index + 1}th`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TotalContributors;
