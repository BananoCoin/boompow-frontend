import InfoSvg from "components/InfoSvg";
import { Link } from "react-router-dom";
import React from "react";
import { Skeleton } from "components/Skeleton";

const TotalRegistered = ({ amount }) => {
  return (
    <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-full md:w-1/3 drop-shadow-md shadow-black">
      <div className="p-4 flex justify-center items-center flex-col gap-4">
        <div className="text-gray-200 text-xl flex">
          <span>Services Registered</span>
          <Link
            to="/services"
            title="Services List"
            className="absolute right-[10px] top-[10px]"
          >
            <InfoSvg />
          </Link>
        </div>
        <div>
          <div className="text-2xl text-gray-100">
            {amount ? amount : <Skeleton size="w-[100px] h-[32px]" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRegistered;
