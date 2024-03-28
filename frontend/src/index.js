import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./indextw.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { PersonalExpenseProvider } from "./context/PersonalExpenseContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ProfileContextProvider } from "./context/ProfileContext";
import { PersonalTaskProvider } from "./context/PersonalTaskContext";
import { HomeExpenseProvider } from "./context/HomeExpenseContext";
import { HomeContextProvider } from "./context/HomeContext";
import { HomeTaskProvider } from "./context/HomeTaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
      <ProfileContextProvider>
          <HomeContextProvider>
            <PersonalExpenseProvider>
              <PersonalTaskProvider>
                <HomeTaskProvider>
                  <HomeExpenseProvider>
                    <App />
                  </HomeExpenseProvider>
                </HomeTaskProvider>
              </PersonalTaskProvider>
            </PersonalExpenseProvider>
          </HomeContextProvider>
      </ProfileContextProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
