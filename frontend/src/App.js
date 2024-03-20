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
import { ExploreAllHome } from "./pages/ExploreAllHome";
import { HomeDetails } from "./pages/HomeDetails";
import PersonalDashboard from "./components/dashboards/PersonalDashboard";
import { JoinedHomeDetails } from "./pages/JoinedHomeDetails";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App bg-main-dark-bg h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
            path="/dashboard/personalDashboard"
            element={user ? <PersonalDashboard /> : <Navigate to="/" />} />
           <Route 
              path="/home/createHome/"
              element={user ? <CreateHome /> : <Navigate to="/" />}   
              />
            <Route 
              path="/home/exploreHomes/"
              element={user ? <ExploreAllHome /> : <Navigate to="/" />}   
              />
            <Route  path="/home/:id"
             element={user ? <HomeDetails /> : <Navigate to="/" />}
            />
            <Route
              path="/homedetails/:id"
              element={user ? <JoinedHomeDetails /> : <Navigate to="/" />}
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
