import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "components/Header";

const Main = React.lazy(() => import("./pages/Main"));

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Suspense
        // LOADER HERE IN THE FUTURE.
        fallback={<div className="bg-banano-gray w-full h-full"></div>}
      >
        <div className="w-full h-full bg-banano-gray flex justify-center items-center px-4">
          <Routes>
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
