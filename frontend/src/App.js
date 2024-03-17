import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages & components

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { ProfileContextProvider } from "./context/ProfileContext";
import LandingPage from "./pages/LandingPage";
import { CreateHome } from "./pages/CreateHome";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App bg-main-dark-bg h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
           <Route 
              path="/home/createHome/"
              element={user ? <CreateHome /> : <Navigate to="/" />}   
              />
            <Route
              path="/"
              element={user ? <LandingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={
                user ? (
                  <ProfileContextProvider>
                    <Profile />
                  </ProfileContextProvider>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
