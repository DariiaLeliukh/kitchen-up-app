import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="home-route">
      <Link to="/cooking-sessions">
        <button>Cooking Sessons</button>
      </Link>
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    </div>
  );
};

export default Dashboard;
