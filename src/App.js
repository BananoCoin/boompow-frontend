import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "components/Header";

import tile from "images/tile.webp";

const Main = React.lazy(() => import("./pages/Main"));

function App() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <Header />
      <Suspense
        // LOADER HERE IN THE FUTURE.
        fallback={<div className="bg-primary w-full h-full"></div>}
      >
        <div className="w-full h-full bg-primary flex justify-center items-center px-4 overflow-y-auto">
          <Routes>
            <Route path="*" element={<Main />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
