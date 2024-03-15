import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersonalExpenseProvider } from "./context/PersonalExpenseContext";
import { AuthContextProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PersonalExpenseProvider>
          <App />
      </PersonalExpenseProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
