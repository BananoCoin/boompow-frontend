import { Link, useSearchParams } from "react-router-dom";

import Provider from "./Provider";
import React from "react";
import Service from "./Service";

// This is the registration modal that was used before it was switched to manual approval/whitelist only
const OldRegister = () => {
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

const Register = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col p-8 text-gray-300">
      Registration is set to whitelist only. If you wish to provide or request
      work, please join our discord and DM bbedward#9246.
      <div className=" text-gray-200 flex gap-8 items-center mt-8">
        <div className="text-gray-200 flex flex-col primary">
          <div>
            <a
              href="https://chat.banano.cc"
              target="_blank"
              rel="noopener"
              className="bg-accent hover:bg-accent-secondary text-gray-900 hover:text-gray-800 transition-colors w-min whitespace-nowrap font-medium flex p-2 rounded"
              title="Join Discord"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
