import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";
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
          {auth.userId && (
            <div className="top-nav-bar__favorites">
              <Link to="/favorites">
                <FontAwesomeIcon icon={faHeart} />
              </Link>
            </div>
          )}
          <div className="top-nav-bar__search">
            <Link to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Link>
          </div>

          <ul>
            {!auth.userId && <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
            }
            {auth.userEmail &&
              <>
                <div className="nav-item dropdown">
                  <div className="top-nav-bar__avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <a className="nav-link dropdown-toggle dropup" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <Link
                      to="/dashboard"
                      className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link
                      to="/cooking-sessions"
                      className="dropdown-item">
                      Cooking Sessons
                    </Link>
                    <Link
                      to="/recipe-lists"
                      className="dropdown-item">
                      Recipe Lists
                    </Link>
                    <Logout className="dropdown-item" />
                  </div>
                </div>
              </>
            }
          </ul>

        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
