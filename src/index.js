import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";
import React from "react";

import { apolloClient } from "apollo";
import { ApolloProvider } from "@apollo/client";
import { CookiesProvider } from "react-cookie";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <ApolloProvider client={apolloClient()}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();
