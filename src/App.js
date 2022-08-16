import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Main = React.lazy(() => import("./pages/Main"));

function App() {
  return (
    <div className="h-screen w-screen">
      <Suspense
        // LOADER HERE IN THE FUTURE.
        fallback={<div></div>}
      >
        <Routes>
          <Route path="*" element={<Main />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
