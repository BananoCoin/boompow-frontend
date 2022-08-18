import Auth from "api/Auth";

import React from "react";
import { useUserStore } from "stores";

import ResetPassword from "./ResetPassword";

const Dashboard = () => {
  const { user } = useUserStore();

  const [copied, setCopied] = React.useState(false);

  React.useState(() => {
    console.log(user)
  }, [user])

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
