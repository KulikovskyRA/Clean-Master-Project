import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const handleLogout = () => {
    fetch(import.meta.env.VITE_URL + 'auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  return (
    <div className="nav">
      <Link className="nav-link" to="/">
        На главную
      </Link>
      <Link className="nav-link" to="/client">
        Личный кабинет
      </Link>

      <button className="logout-btn " onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-door-closed"
          viewBox="0 0 16 16"
        >
          <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
