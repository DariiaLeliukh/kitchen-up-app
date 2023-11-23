import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import '../styles/css/topnav.css';

import useAuth from '../hooks/useAuth';
import Logout from './Logout';

const TopNavigation = () => {
  const { auth } = useAuth();

  return (
    <div className="top-nav-container">
      <div className="top-nav-bar">
        <span className="top-nav-bar__logo"><Link to="/">Kitchen Up</Link></span>

        <div className="top-nav-bar__menu">
          <div className="top-nav-bar__avatar">
            <FontAwesomeIcon icon={faUser} />
          </div>
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
    </div>
  );
};

export default TopNavigation;
