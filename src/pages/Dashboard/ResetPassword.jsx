import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "stores";
import { Formik } from "formik";
import Auth from "api/Auth";
import SubmitButton from "components/SubmitButton";

const ResetPassword = () => {
  let navigate = useNavigate();

  const [error, setError] = React.useState("");
  const { user, setUser } = useUserStore();

  return (
    <div className="flex flex-col mt-8 min-w-[250px]">
      <div className="font-bold text-lg">Change Password</div>
      <Formik
        initialValues={{ newPassword: "", oldPassword: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.oldPassword) {
            errors.oldPassword = "This field is required.";
          }

          if (!values.newPassword) {
            errors.newPassword = "This field is required.";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await Auth.changePassword(values.oldPassword, values.newPassword);
            // navigate("/dashboard");
          } catch (e) {
            setError(e.response?.data);
          }
          setSubmitting(false);
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
            <div className="mb-2">
              <div className="text-gray-300">Old Password</div>
              <input
                className="bg-banano-gray p-2 rounded-md text-gray-200 w-full"
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="password"
                placeholder="Old Password"
                type="password"
                id="oldPassword"
              />
              {errors.oldPassword && touched.oldPassword && (
                <div className="text-red-500 text-xs flex items-center">
                  {errors.oldPassword}
                </div>
              )}
            </div>

            <div className="mb-2">
              <div className="text-gray-300">New Password</div>

              <input
                className="bg-banano-gray p-2 rounded-md text-gray-200 w-full"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                placeholder="New Password"
                id="newPassword"
                type="password"
              />
              {errors.newPassword && touched.newPassword && (
                <div className="text-red-500 text-xs flex items-center">
                  {errors.newPassword}
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-xs flex items-center">
                {error}
              </div>
            )}
            <SubmitButton disabled={isSubmitting} text="Change Password"/>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
