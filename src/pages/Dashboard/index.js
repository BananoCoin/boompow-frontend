import Auth from 'api/Auth';

import React from 'react';
import { useUserStore } from 'stores';

import ResetPassword from './ResetPassword';

const Dashboard = () => {
  const { user } = useUserStore();

  const [copied, setCopied] = React.useState(false);

  return (
    <div className="w-full h-full flex flex-col max-w-3xl py-8 md:py-16 text-gray-200">
      <div className="text-gray-300 text-xl font-bold">DASHBOARD</div>
      <div>Welcome back, {user.email.split('@')[0]}!</div>
      <div className="mt-12 text-gray-200">
        <span className="font-semibold mr-2">Account Type:</span>
        {user.type.toUpperCase()}
      </div>
      <div className=" text-gray-200 mt-1">
        <span className="font-semibold mr-2">Email:</span>
        {user.email}
      </div>
      <div className=" text-gray-200 mb-1">
        <span className={`font-semibold mr-2`}>Email Verified:</span>
        <span>{user.emailVerified ? 'Yes' : 'No'}</span>
        {!user.emailVerified && (
          <button
            className="ml-4 underline text-banano-yellow text-sm"
            onClick={async () => {
              await Auth.resendVerificationEmail();
            }}
          >
            RESEND VERIFICATION EMAIL
          </button>
        )}
      </div>
      {user.type === 'provider' && (
        <div className=" text-gray-200">
          <span className="font-semibold mr-2 whitespace-nowrap">
            Banano Address:
          </span>
          <span
            className="break-all cursor-pointer"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(user.banAddress);
              setTimeout(() => setCopied(false), 1000);
            }}
          >
            {copied ? 'Copied address to clipboard!' : user.banAddress}
          </span>
        </div>
      )}
      {user.type === 'service' && (
        <React.Fragment>
          <div className=" text-gray-200">
            <span className="font-semibold mr-2 whitespace-nowrap">
              Service Name:
            </span>
            <span className="break-all">{user.serviceName}</span>
          </div>
          <div className=" text-gray-200">
            <span className="font-semibold mr-2 whitespace-nowrap">
              Service Website:
            </span>
            <span className="break-all">{user.serviceWebsite}</span>
          </div>
        </React.Fragment>
      )}
      <div className="md:w-1/2">
        <ResetPassword />
      </div>
    </div>
  );
};

export default Dashboard;
