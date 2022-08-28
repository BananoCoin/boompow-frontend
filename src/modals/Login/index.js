import { useNavigate, useSearchParams } from "react-router-dom";

import { ApolloError } from "@apollo/client";
import Auth from "api/Auth.js";
import { Formik } from "formik";
import React from "react";
import SubmitButton from "components/SubmitButton";
import { useCookies } from "react-cookie";

const Login = () => {
  const [error, setError] = React.useState("");
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <div className="flex p-8">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "This field is required.";
          }

          if (!values.password) {
            errors.password = "This field is required.";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const resp = await Auth.login(values.email, values.password);
            const expires = new Date();
            expires.setHours(expires.getHours() + 20);
            setCookie("token", resp.token, {
              expires
            });
            navigate("/dashboard");
          } catch (e) {
            if (e instanceof ApolloError) {
              setError(e.message.charAt(0).toUpperCase() + e.message.slice(1));
            } else {
              setError("Unknown error occured, try again later");
            }
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
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <div className="text-gray-300">Email</div>
              <input
                className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                placeholder="Email"
                type="email"
                id="email"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-xs flex items-center">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="mb-8">
              <div className="text-gray-300">Password</div>

              <input
                className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="password"
                placeholder="Password"
                type="password"
                id="password"
              />
              {errors.password && touched.password && (
                <div className="text-red-500 text-xs flex items-center">
                  {errors.password}
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-xs flex items-center">
                {error}
              </div>
            )}
            <SubmitButton disabled={isSubmitting} text="Log In" />
            <div className="w-full flex justify-center">
              <button
                className="flex justify-center items-center underline font-semibold text-sm text-gray-300/25 mt-4"
                onClick={() => {
                  setSearchParams("?modal=recover");
                }}
              >
                I forgot my password
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
