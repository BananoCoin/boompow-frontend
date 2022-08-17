import { Formik } from 'formik';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserStore } from 'stores';
import Auth from 'api/Auth.js';
import { ApolloError } from '@apollo/client';

const Login = () => {
  const [error, setError] = React.useState('');
  let navigate = useNavigate();
  const { user, setUser } = useUserStore();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex p-8">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'This field is required.';
          }

          if (!values.password) {
            errors.password = 'This field is required.';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // SHOULD SET TOKEN TO A COOKIE?
            const resp = await Auth.login(values.email, values.password);
            // ! TODO - this is dangerous, we should remove "token" from this object and store it somewhere secure
            setUser(resp);
            navigate('/dashboard');
          } catch (e) {
            if (e instanceof ApolloError) {
              setError(e.message.charAt(0).toUpperCase() + e.message.slice(1));
            } else {
              setError('Unknown error occured, try again later');
            }
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
            <div className="mb-12">
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
              {isSubmitting ? <span>LOADER HERE!</span> : `Log In`}
            </button>
            <button
              className="w-full flex justify-center items-center underline font-semibold text-sm text-gray-400 mt-4"
              onClick={() => {
                setSearchParams('?modal=recover');
              }}
            >
              I forgot my password
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
