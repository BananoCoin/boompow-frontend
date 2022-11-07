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
              className="bg-accent hover:bg-accent-secondary text-gray-900 hover:text-gray-800 transition-colors w-min whitespace-nowrap font-semibold text-sm flex gap-2 p-2 rounded"
              title="Join Discord"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  fill="#111827"
                  d="M14.165 16.333l-.99-1.238c1.963-.565 2.712-1.818 2.712-1.818-3.354 2.252-8.342 2.372-11.687-.015 0 0 .72 1.222 2.622 1.803L5.82 16.333c-3.31-.107-4.57-2.322-4.57-2.322 0-4.92 2.158-8.907 2.158-8.907 2.158-1.65 4.2-1.604 4.2-1.604l.15.183c-2.697.794-3.94 2-3.94 2 3.706-2.06 8.38-2.066 12.076 0 0 0-1.184-1.146-3.73-1.94l.2-.244s2.053-.046 4.2 1.604c0 0 2.157 3.987 2.157 8.907 0 0-1.273 2.215-4.585 2.322zM7.198 9.2c-.854 0-1.528.764-1.528 1.696S6.36 12.6 7.198 12.6c.854 0 1.528-.764 1.528-1.696C8.74 9.963 8.052 9.2 7.198 9.2zm5.47 0c-.854 0-1.528.764-1.528 1.696s.69 1.696 1.528 1.696c.854 0 1.528-.764 1.528-1.696S13.52 9.2 12.667 9.2z"
                ></path>
              </svg>
              <div>Join Discord</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
