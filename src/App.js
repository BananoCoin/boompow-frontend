import React, { Suspense } from "react";
import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";

import Header from "components/Header";

import Modal from "components/Modal";
import Login from "modals/Login";
import Register from "modals/Register";

import { useUserStore } from "stores";
import VerifyEmail from "pages/VerifyEmail";

const Main = React.lazy(() => import("./pages/Main"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUserStore();

  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Suspense
        // LOADER HERE IN THE FUTURE.
        fallback={<div className="bg-primary w-full h-full"></div>}
      >
        {!user && searchParams.get("modal") === "login" && (
          <Modal modal={<Login />} />
        )}
        {searchParams.get("modal") === "register" && (
          <Modal modal={<Register />} />
        )}
        <div className="w-full h-full bg-primary flex justify-center items-center px-4 overflow-y-auto">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify_email/:email/:token"
              element={<VerifyEmail />}
            />
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
