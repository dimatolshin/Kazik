import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global/index.scss";
import StoreProviders from "./providers/StoreProvider/StoreProviders.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProviders>
  </React.StrictMode>
);
