import { Link } from "react-router-dom";

const ProfileBadge = ({ user }) => {
    return (
  <Link to={`/profile/${user.userId}`} className="user-badge" >
    {user.email.charAt(0).toUpperCase()}
  </Link>
    );
};

export default ProfileBadge;
