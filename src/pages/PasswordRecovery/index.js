import Auth from "api/Auth";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Formik } from "formik";
import SubmitButton from "components/SubmitButton";

const NewPasswordForm = ({ email, token, setSuccess }) => {
  // This is for error with submitting password change.
  const [error, setError] = React.useState(false);

  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.password) {
          errors.password = "This field is required.";
        }

        if (values.confirmPassword !== values.password)
          errors.confirmPassword = "Passwords do not match.";

        if (!values.confirmPassword) {
          errors.confirmPassword = "This field is required.";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await Auth.recoverPassword(email, token, values.password);
          setSuccess(true);
        } catch (e) {
          setError(e.response?.data);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        dirty
      }) => (
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <div className="text-gray-300">New Password</div>
            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              placeholder="New Password"
              type="password"
              id="password"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-xs flex items-center">
                {errors.password}
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="text-gray-300">Confirm New Password</div>

            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              placeholder="Confirm New Password"
              id="confirmPassword"
              type="password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-xs flex items-center">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-xs flex items-center">
              {error}
            </div>
          )}
          <SubmitButton disabled={isSubmitting} text="Change Password" />
        </form>
      )}
    </Formik>
  );
};

const PasswordRecovery = () => {
  const params = useParams();
  const { token, email } = params;

  // Token and email are valid.
  const [canReset, setCanReset] = React.useState(null);

  // Updated password successfully
  const [success, setSuccess] = React.useState(null);

  const checkToken = async () => {
    try {
      const isValidToken = await Auth.checkRecoveryToken(email, token);
      if (!isValidToken) throw new Error();

      setCanReset(true);
    } catch (e) {
      console.error(e);
      setCanReset(false);
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="text-gray-100 w-full flex justify-center items-center">
      {/* STILL LOADING */}
      {canReset === null && "Checking token..."}
      {canReset === true && (
        <React.Fragment>
          {!success ? (
            <div className="w-full max-w-[300px]">
              <NewPasswordForm
                email={email}
                token={token}
                setSuccess={setSuccess}
              />
            </div>
          ) : (
            <span className="text-green-400">
              Successfully changed password!
            </span>
          )}
        </React.Fragment>
      )}
      {canReset === false &&
        "Invalid token. The link may have already expired."}
    </div>
  );
};

export default PasswordRecovery;
