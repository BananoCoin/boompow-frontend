import { useNavigate, useSearchParams } from "react-router-dom";

import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const CopySvg = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5"
    fill="black"
    stroke="currentColor"
    viewBox="0 0 330 330"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15
c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95
c-8.284,0-15,6.716-15,15v165H50V30z"
      />
      <path d="M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z" />
      <path d="M235,180h-80c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z" />
      <path
        d="M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z
"
      />
    </g>
  </svg>
);

const ServiceToken = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-8 text-gray-200">
      <div className="mb-8 text-sm text-gray-200">
        <div>
          This is the token that you need to use to request work from BoomPoW.
        </div>
        <div>
          You should have received an email with instructions on how to use it
          as part of the registration process. The simplest way is to use
          <a
            href="https://github.com/appditto/pippin_nano_wallet/tree/master/pippin"
            target="_blank"
            rel="noreferrer"
          >
            Pippin
          </a>
          , where you can just set it in the environment as{" "}
          <code>BPOW_TOKEN</code>
        </div>
        <br />
        <div className="flex w-full">
          <input
            onFocus={(e) => e.target.select()}
            className="bg-banano-gray p-2 rounded-md rounded-r-none text-gray-200 w-full placeholder:text-sm outline-none"
            value={searchParams.get("token")}
            readOnly={true}
            type="token"
            id="token"
          />
          <button
            type="copy"
            className="top-0 right-0 p-2.5 text-sm font-medium text-white bg-banano-yellow rounded-r-md border border-banano-yellow hover:border-accent-secondary hover:bg-accent-secondary focus:outline-banano-yellow"
            onClick={() => {
              copy(searchParams.get("token"));
              toast.success("Token copied to clipboard");
            }}
          >
            <CopySvg />
          </button>
        </div>
        <div className="mt-2 italic text-gray-200/50">
          <span className="text-red-500 font-normal mr-1 text-xs">*</span>
          Do not share this token with anyone.
        </div>
        <div className="italic text-gray-200/50">
          <span className="text-red-500 font-normal mr-1 text-xs">*</span>
          Abuse of the service will result in revoked privileges.
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          className="flex justify-center items-center underline font-semibold text-sm text-gray-200/25 mt-2"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ServiceToken;
