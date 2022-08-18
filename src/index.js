import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";
import React from "react";

import { apolloClient } from "apollo";
import { ApolloProvider } from "@apollo/client";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <ApolloProvider client={apolloClient()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();
