import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <Link to="/cooking-sessions" className="button">
        Cooking Sessons
      </Link>
      <Link to="/recipe-lists" className="button">
        REcipe Lists
      </Link>
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    </div>
  );
};

export default Dashboard;
