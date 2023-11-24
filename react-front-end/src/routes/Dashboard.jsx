import { Link } from "react-router-dom";
import TopNavigation from "../components/TopNavigation";

const Dashboard = () => {
  return (
    <div className="home-route">
      <Link to="/cooking-sessions">
        <button>Cooking Sessons</button>
      </Link>
    </div>
  );
};

export default Dashboard;
