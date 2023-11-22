import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Logout from './Logout';

const TopNavigation = () => {
  const { auth } = useAuth();

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo"><Link to="/">Kitchen Up</Link></span>
      <div className="top-nav-bar__menu">
        <ul>
          {!auth.userId && <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
          }
          {auth.userId &&
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <Logout />
            </>
          }
        </ul>
      </div>

    </div>
  );
};

export default TopNavigation;