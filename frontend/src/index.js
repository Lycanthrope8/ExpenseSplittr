import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./indextw.css";
import App from "./App";
import { PersonalExpenseProvider } from "./context/PersonalExpenseContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { PersonalTaskProvider } from "./context/PersonalTaskContext";
import { HomeExpenseProvider } from "./context/homeExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProfileContextProvider>
        <PersonalExpenseProvider>
          <PersonalTaskProvider>
            <HomeExpenseProvider>
              <App />
            </HomeExpenseProvider>
          </PersonalTaskProvider>
        </PersonalExpenseProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
