import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CopilotKit } from "@copilotkit/react-core";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CopilotKit runtimeUrl={`${process.env.REACT_APP_BACKEND_URL}/copilotkit`}>
      <App />
    </CopilotKit>
  </React.StrictMode>
);

reportWebVitals();
