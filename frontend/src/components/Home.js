import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export const Home = () => {
    const { user } = useAuthContext();
  return (
    <div>
    <Link to={`/home/createHome/`}>Create
      </Link>
    <button>Join</button>
    <button>Explore</button>
    </div>
  )
}

