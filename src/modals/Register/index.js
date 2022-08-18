import React from "react";
import { useSearchParams } from "react-router-dom";
import Provider from "./Provider";
import Service from "./Service";

const Register = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col p-8">
      <div className="flex mb-8 gap-2 h-[35px]">
        <button
          className={`${
            searchParams.get("type") === "provider"
              ? "bg-banano-gray text-gray-300"
              : "bg-banano-gray-dark text-gray-500"
          } px-3 py-1 rounded-md w-full`}
          onClick={() => {
            setSearchParams("?modal=register&type=provider");
          }}
        >
          Provider
        </button>
        <button
          className={`${
            searchParams.get("type") === "service"
              ? "bg-banano-gray text-gray-300"
              : "bg-banano-gray-dark text-gray-500"
          } px-3 py-1 rounded-md w-full`}
          onClick={() => {
            setSearchParams("?modal=register&type=service");
          }}
        >
          Service
        </button>
      </div>
      {searchParams.get("type") === "provider" ? <Provider /> : <Service />}
    </div>
  );
};

export default Register;
