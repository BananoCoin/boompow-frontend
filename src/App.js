import React, { Suspense } from "react";
import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";

import Header from "components/Header";
import Modal from "components/Modal";

import Loader from "components/Loader";

import Login from "modals/Login";
import Register from "modals/Register";
import Recover from "modals/Recover";

import Services from "pages/Services";
import VerifyEmail from "pages/VerifyEmail";
import Install from "pages/Install";
import { useCookies } from "react-cookie";
import PasswordRecovery from "pages/PasswordRecovery";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = React.lazy(() => import("./pages/Main"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/?modal=login" replace />;
  }

  return children;
};

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["token"]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <ToastContainer
        autoClose={2500}
        theme="dark"
        toastStyle={{
          backgroundColor: "#151517"
        }}
      />

      <Header />

      <Suspense
        fallback={
          <div className="bg-primary w-full h-full flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        {!cookies.token && searchParams.get("modal") === "login" && (
          <Modal modal={<Login />} title="Log In" />
        )}

        {!cookies.token && searchParams.get("modal") === "recover" && (
          <Modal modal={<Recover />} title="Recover Password" />
        )}

        {searchParams.get("modal") === "register" && (
          <Modal modal={<Register />} title="Register" />
        )}
        <div className="w-full h-full bg-primary flex justify-center items-center px-4 overflow-y-auto">
          <Routes>
            <Route path="/install" element={<Install />} />
            <Route path="/services" element={<Services />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute token={cookies.token}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify_email/:email/:token"
              element={<VerifyEmail />}
            />
            <Route
              path="/reset_password/:token"
              element={<PasswordRecovery />}
            />
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
