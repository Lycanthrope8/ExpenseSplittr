// import {AiOutlineMenu} from 'react-icons/ai';
// import {FiShoppingCart} from 'react-icons/fi';
// import {BsChatLeft} from 'react-icons/bs';
// import {RiNotification3Line} from 'react-icons/ri';
// import {}
// import { useEffect } from 'react';
// import { useStateContext } from '../context/StateProvider';
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfileBadge from "./ProfileBadge";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const { activeMenu, setActiveMenu } = useStateContext();

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  

  return (
    // <header className="absolute w-full top-0">
      <div className="flex items-center justify-between p-6 text-text text-2xl">
        <Link to="/">
          <h1>ExpenseSplittr</h1>
        </Link>
        <nav>
          {user && (
            <div className="user-info grid grid-cols-3 gap-4">
              <button className="material-symbols-outlined text-5xl align-middle hover:text-red-400 transition-colors" onClick={() => navigate("/admin")}>admin_panel_settings</button>
              <ProfileBadge user={user} />
              <button className="material-symbols-outlined text-5xl align-middle hover:text-red-400 transition-colors" onClick={handleClick}>Logout</button>
            </div>
          )}

          {!user && (
            <div className="grid grid-cols-2">
              <Link className="rounded-xl text-center p-2 hover:text-main-dark-bg hover:bg-zinc-200" to="/login">Login</Link>
              <Link className="rounded-xl text-center p-2 hover:text-main-dark-bg hover:bg-zinc-200" to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    // </header>
  );
};

export default Navbar;
