import Auth, { GET_USER_QUERY } from "api/Auth";

import React from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@apollo/client";

import { Link, useNavigate } from "react-router-dom";

const WarningSvg = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    ></path>
  </svg>
);

const Dashboard = () => {
  const [copied, setCopied] = React.useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    context: {
      headers: {
        Authorization: cookies.token
      }
    }
  });
  const navigate = useNavigate();

  if (loading) return "Loading...";

  if (error) {
    if (error.message.includes("access denied")) {
      setCookie("token", "");
      navigate("/?modal=login");
    }
    // 500 ?
    return error.message;
  }

  const user = data.getUser;

  return (
    <div className="flex w-full md:w-1/2 flex-col max-w-4xl text-gray-200">
      <div className="rounded-md p-8">
        <div className="text-gray-300 text-xl font-bold mb-6">
          ACCOUNT DASHBOARD
        </div>

        <div className="text-gray-200 flex flex-col">
          <span className="text-gray-400">Account Type</span>
          <span className="flex items-center">{user.type.toUpperCase()}</span>
        </div>
        <div className=" text-gray-200 mt-4 flex flex-col">
          <span className="text-gray-400 mr-2">Email</span>
          <div className="flex">
            <div className="flex items-center">{user.email}</div>
            <div>
              {!user.emailVerified && (
                <button
                  className="flex items-center ml-4 px-1 py-1 rounded hover:bg-dark/75 transition-colors bg-dark text-sm text-accent hover:text-accent-secondary"
                  onClick={async () => {
                    await Auth.resendVerificationEmail();
                  }}
                >
                  <WarningSvg />
                  <span className="ml-1">Resend Verification Email</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {user.type === "PROVIDER" && (
          <div className="mt-4">
            <div className=" text-gray-200 flex gap-8 items-center">
              <div className="text-gray-200 flex flex-col">
                <span className="text-gray-400">Banano Address</span>
                <button
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(user.banAddress);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                  className="flex items-center break-all"
                >
                  {copied ? "Copied address to clipboard!" : user.banAddress}
                </button>
              </div>
            </div>
            <div className=" text-gray-200 flex gap-8 items-center mt-8">
              <div className="text-gray-200 flex flex-col">
                <div>
                  <Link
                    to="/install"
                    className="bg-dark transition-colors w-min whitespace-nowrap text-gray-400 font-medium flex p-2 rounded hover:bg-dark/75 hover:text-gray-300"
                    title="Install Instructions"
                  >
                    Install BoomPOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {user.type === "REQUESTER" && (
          <div className="mt-4">
            <div className=" text-gray-200 flex gap-8 items-center">
              <div className="text-gray-200 flex flex-col">
                <span className="text-gray-400">Service Name</span>
                <span className="flex items-center break-all">
                  {user.serviceName}
                </span>
              </div>
              <div className="text-gray-200 flex flex-col">
                <span className="text-gray-400">Service Website</span>
                <span className="flex items-center break-all">
                  {user.serviceWebsite}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
