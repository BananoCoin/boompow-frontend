import React from "react";
import { Skeleton } from "components/Skeleton";

const TotalConnected = ({ amount }) => {
  return (
    <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-full md:w-1/3 drop-shadow-md shadow-black">
      <div className="p-4 flex justify-center items-center flex-col gap-4">
        <div className="text-gray-200 text-xl">Users Connected</div>
        <div>
          <div className="text-2xl text-gray-100">
            {amount !== undefined ? (
              amount
            ) : (
              <Skeleton size="w-[40px] h-[32px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalConnected;
