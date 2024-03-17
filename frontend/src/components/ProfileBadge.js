import { Link } from "react-router-dom";

const ProfileBadge = ({ user }) => {
    return (
      // className="user-badge"
  <Link to={`/profile/${user.userId}`} className="relative inline-flex items-center justify-center w-12 h-12 mr-4 overflow-hidden ring-2 ring-zinc-500 bg-secondary-dark-bg rounded-full" >
    {user.email.charAt(0).toUpperCase()}
  </Link>
    );
};

export default ProfileBadge;
