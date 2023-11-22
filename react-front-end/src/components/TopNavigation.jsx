import { Link } from 'react-router-dom';
import "../styles/css/topnav.css"

const TopNavigation = (props) => {
  return (
    <div className="top-nav-container">
      <div className="top-nav-bar">
        <span className="top-nav-bar__logo"><Link to="/">Kitchen Up</Link></span>
        <div className="top-nav-bar__menu">
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default TopNavigation;