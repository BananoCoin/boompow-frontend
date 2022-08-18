import { Skeleton } from "components/Skeleton";
import React from "react";
import { Link } from "react-router-dom";

const InfoSvg = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const TotalRegistered = ({ amount }) => {
  return (
    <div className="bg-dark rounded-md rounded-l-none border-banano-yellow border-l-4 w-full md:max-w-[320px] drop-shadow-md shadow-black">
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
