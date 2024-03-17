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

const Navbar = () => {
  // const { activeMenu, setActiveMenu } = useStateContext();

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  

  return (
    <header>
      <div className="flex items-center justify-between p-6 text-zinc-100 text-2xl">
        <Link to="/">
          <h1>ExpenseSplittr</h1>
        </Link>
        <nav>
          {user && (
            <div className="user-info">
              <ProfileBadge user={user} />
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
