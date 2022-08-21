import { Formik } from "formik";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Auth from "api/Auth.js";
import SubmitButton from "components/SubmitButton";
import { toast } from "react-toastify";

const Recover = () => {
  const [error, setError] = React.useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col p-8">
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "This field is required.";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await Auth.sendRecoveryEmail(values.email);
            toast.success("Successfully sent password recovery email!");
            resetForm();
          } catch (e) {
            setError("Unknown error occured, try again later");
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
            <div className="mb-8">
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

            {error && (
              <div className="text-red-500 text-xs flex items-center">
                {error}
              </div>
            )}
            <SubmitButton disabled={isSubmitting} text="Send Recovery Email" />
            <button
              className="w-full flex justify-center items-center underline font-semibold text-sm text-gray-300/25 mt-4"
              onClick={() => {
                setSearchParams("?modal=login");
              }}
            >
              Go Back
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Recover;
