import "react-toastify/dist/ReactToastify.css";

import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import React, { Suspense } from "react";

import Contributors from "pages/Contributors";
import Footer from "components/Footer";
import Header from "components/Header";
import Install from "pages/Install";
import Login from "modals/Login";
import Modal from "components/Modal";
import PasswordRecovery from "pages/PasswordRecovery";
import Recover from "modals/Recover";
import Register from "modals/Register";
import { STATS_SUBSCRIPTION } from "api/Stats";
import ServiceToken from "modals/ServiceToken";
import Services from "pages/Services";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "pages/VerifyEmail";
import { useCookies } from "react-cookie";
import { useMainStore } from "stores";
import { useSubscription } from "@apollo/client";

const Main = React.lazy(() => import("./pages/Main"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/?modal=login" replace />;
  }

  return children;
};

const formatTopContributors = (pTopContributors) => {
  let topContributors = [];
  topContributors = pTopContributors.sort((a, b) =>
    Number(a.totalPaidBanano) > Number(b.totalPaidBanano) ? -1 : 1
  );
  return topContributors;
};

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["token"]);

  const { stats, setStats } = useMainStore();

  const { data } = useSubscription(STATS_SUBSCRIPTION);
  React.useEffect(() => {
    if (!data) return;
    setStats({
      ...stats,
      totalConnected: data?.stats?.connectedWorkers,
      totalPaidBanano: data?.stats?.totalPaidBanano,
      registeredServiceCount: data?.stats?.registeredServiceCount,
      topContributors:
        data?.stats?.top10 && formatTopContributors(data?.stats?.top10),
      services: data?.stats?.services
    });
  }, [data]);

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
      <div className="flex flex-col justify-between w-full h-full bg-primary overflow-y-auto">
        <div className="md:min-h-full">
          <Suspense>
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

            <div className="w-full md:h-full flex justify-center items-center flex-col px-4 py-2">
              <Routes>
                <Route path="/install" element={<Install />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contributors" element={<Contributors />} />
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
            <div className="md:hidden">
              <Footer />
            </div>
          </Suspense>
        </div>

        <div className="hidden md:block">
          {/* DESKTOP FOOTER */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
