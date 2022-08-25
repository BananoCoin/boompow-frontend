import { Formik } from "formik";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Auth from "api/Auth.js";
import SubmitButton from "components/SubmitButton";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

const ServiceToken = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-8">
      <div className="mb-8">
        <div className="text-gray-400 text-sm">
          This is the token that you need to use to request work from BoomPoW.
        </div>
        <div className="text-gray-400 text-sm">
          You should have received an email with instructions on how to use it
          as part of the registration process. The simplest way is to use
          Pippin, where you can just set it in the environment as{" "}
          <code>BPOW_TOKEN</code>
        </div>
        <br />
        <div class="flex">
          <div class="relative w-full">
            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
              value={searchParams.get("token")}
              readOnly={true}
              type="token"
              id="token"
            />
            <button
              type="copy"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-banano-yellow rounded-r-lg border border-banano-yellow hover:border-accent-secondary hover:bg-accent-secondary focus:ring-4"
              onClick={() => {
                copy(searchParams.get("token"));
                toast.success("Token copied to clipboard");
              }}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
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
            </button>
          </div>
        </div>
        <div className="text-gray-400  text-sm font-bold">
          Do not share this token with anyone.
        </div>
        <div className="text-gray-400 text-sm font-bold">
          Abuse of the service will result in revoked privileges.
        </div>
      </div>

      <button
        className="w-full flex justify-center items-center underline font-semibold text-sm text-gray-300/25 mt-4"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ServiceToken;
