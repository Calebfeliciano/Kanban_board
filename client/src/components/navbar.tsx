import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import auth from '../utils/auth-service';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ detect route changes

  // ✅ Recheck login state on every route change
  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, [location]);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'><h2>Kanban</h2></Link>
      </div>
      <ul>
        <li className='nav-item'>
          <button type='button' id='create-ticket-link' className='btn'>
            <Link to='/create'>New Ticket</Link>
          </button>
        </li>
        {
          !loginCheck ? (
            <li className='nav-item'>
              <button type='button' className='btn'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          ) : (
            <li className='nav-item'>
              <button type='button' className='btn' onClick={() => auth.logout(navigate)}>
                Logout
              </button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default Navbar;
