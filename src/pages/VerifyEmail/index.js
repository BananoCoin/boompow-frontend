import Auth from "api/Auth";
import React from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [success, setSuccess] = React.useState(null);
  const params = useParams();

  const tryVerify = async () => {
    const success = await Auth.verifyEmail(params.token);
    setSuccess(success);
  };

  React.useEffect(() => {
    tryVerify();
  }, []);

  return (
    <div className="text-gray-100">
      {/* STILL LOADING */}
      {success === null && "Verifying your email address..."}
      {success === true && "Your email address has been successfully verified!"}
      {success === false &&
        "Something went wrong verifying your email address..."}
    </div>
  );
};

export default VerifyEmail;
