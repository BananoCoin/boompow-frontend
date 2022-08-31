import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import React, { Suspense } from "react";

import Footer from "components/Footer";
import Header from "components/Header";
import Install from "pages/Install";
import Loader from "components/Loader";
import Login from "modals/Login";
import Modal from "components/Modal";
import PasswordRecovery from "pages/PasswordRecovery";
import Recover from "modals/Recover";
import Register from "modals/Register";
import ServiceToken from "modals/ServiceToken";
import Services from "pages/Services";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "pages/VerifyEmail";
import { useCookies } from "react-cookie";

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

      {/* MAIN PAGE CONTAINER */}
      <div className="flex flex-col justify-between h-full bg-primary overflow-y-auto">
        <div className="min-h-full">
          <Suspense
            fallback={
              <div className="w-full flex justify-center items-center">
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

            {searchParams.get("modal") === "service_token" && (
              <Modal modal={<ServiceToken />} title="Service Token" />
            )}

            <div className="w-full min-h-full flex justify-center items-center flex-col px-4">
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
            {/* MOBILE FOOTER FOR SOME DUMB RESPONSIVENESS WORKAROUND */}
            <div className="sm:hidden">
              <Footer />
            </div>
          </Suspense>
        </div>
        <div className="hidden sm:block">
          {/* DESKTOP FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
