import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/cooking-sessions" className="button-tile">
            Cooking Sessons
          </Link>
        </div>
        <div className="col">
          <Link to="/recipe-lists" className="button-tile">
            Recipe Lists
          </Link>
        </div>
        <div className="col">
          <Link to="/favorites" className="button-tile">
            Favorites
          </Link>
        </div>
      </div>



    </div>
  );
};

export default Dashboard;
