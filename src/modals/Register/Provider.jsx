import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Formik } from "formik";
import Auth from "api/Auth";
import SubmitButton from "components/SubmitButton";
import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";

const Provider = () => {
  let navigate = useNavigate();

  const [error, setError] = React.useState("");

  return (
    <Formik
      initialValues={{ email: "", password: "", banAddress: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "This field is required.";
        }

        if (!values.password) {
          errors.password = "This field is required.";
        }

        if (!/^ban_[13][0-13-9a-km-uw-z]{59}$/i.test(values.banAddress)) {
          errors.banAddress = "Invalid banano address.";
        }

        if (!values.banAddress) {
          errors.banAddress = "This field is required.";
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const resp = await Auth.register({
            type: "PROVIDER",
            email: values.email,
            password: values.password,
            banAddress: values.banAddress,
            serviceName: undefined,
            serviceWebsite: undefined
          });
          if (resp.id) {
            toast.success(
              "You have successfully registered. Please check your email to verify your account."
            );
          }
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

          <div className="mb-4">
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

          <div className="mb-8">
            <div className="text-gray-300">Banano Address</div>
            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full placeholder:text-sm"
              value={values.banAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="on"
              placeholder="ban_"
              id="banAddress"
            />
            {errors.banAddress && touched.banAddress && (
              <div className="text-red-500 text-xs flex items-center">
                {errors.banAddress}
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-xs flex items-center">
              {error}
            </div>
          )}
          <SubmitButton disabled={isSubmitting} text="Register Provider" />
        </form>
      )}
    </Formik>
  );
};

export default Provider;
