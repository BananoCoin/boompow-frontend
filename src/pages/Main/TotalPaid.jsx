import React from "react";
import { formatBan } from "components/Banano";
import { Skeleton } from "components/Skeleton";

const TotalPaid = ({ amount }) => {
  return (
    <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-80 shadow-sm shadow-black">
      <div className="p-4 flex justify-center items-center flex-col gap-4">
        <div className="text-gray-200 text-xl">Total Paid</div>
        <div>
          <div className="text-2xl text-gray-100">
            {amount ? (
              formatBan(amount, "32px")
            ) : (
              <Skeleton size="w-[200px] h-[32px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPaid;
