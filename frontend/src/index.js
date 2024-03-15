import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersonalExpenseProvider } from "./context/PersonalExpenseContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfileFormProvider } from "./context/ProfileFormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PersonalExpenseProvider>
        <ProfileFormProvider>
          <App />
        </ProfileFormProvider>
      </PersonalExpenseProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
