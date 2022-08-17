import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "stores";
import { Formik } from "formik";
import Auth from "api/Auth";

const Provider = () => {
  let navigate = useNavigate();

  const [error, setError] = React.useState("");
  const { setUser } = useUserStore();

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
          await Auth.register({
            type: "provider",
            email: values.email,
            password: values.password,
            banAddress: values.banAddress,
          });
          // FETCH USER AND SET IT USING setUser() TO LOG USER IN
          navigate("/dashboard");
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
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-8">
            <div className="text-gray-300">Email</div>
            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full"
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
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full"
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

          <div className="mb-12">
            <div className="text-gray-300">Banano Address</div>
            <input
              className="bg-banano-gray p-2 rounded-md text-gray-200 w-full"
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
          <button
            className={`w-full px-4 py-2 rounded-md shadow shadow-black ${
              !isSubmitting
                ? `bg-banano-yellow hover:bg-accent-secondary text-gray-900 hover:text-gray-800`
                : `bg-primary  text-slate-500 flex justify-center items-center`
            } font-bold`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span>LOADER HERE!</span> : `Register`}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Provider;
