import Auth from "api/Auth";
import React from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const [success, setSuccess] = React.useState(null);
  const params = useParams();
  const { token, email } = params;

  const tryVerify = async () => {
    try {
      const success = await Auth.verifyEmail(email, token);
      setSuccess(success);
    } catch (e) {
      console.log(e);
      setSuccess(false);
    }
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
        "Something went wrong verifying your email address...The link may have expired."}
    </div>
  );
};

export default VerifyEmail;
