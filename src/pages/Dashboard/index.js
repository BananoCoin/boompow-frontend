import Auth, { GET_USER_QUERY } from "api/Auth";

import React from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@apollo/client";

import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";

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
    <div className="flex w-full md:w-1/2 flex-col max-w-3xl text-gray-200">
      <div className="bg-dark rounded-md p-8">
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
                  className="ml-4 px-1 py-1 rounded hover:bg-banano-gray transition-colors bg-banano-gray-dark text-sm text-yellow-400"
                  onClick={async () => {
                    await Auth.resendVerificationEmail();
                  }}
                >
                  Resend Verification Email
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
