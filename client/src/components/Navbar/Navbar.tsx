import { Link } from 'react-router-dom';

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
      <button className="logout-btn" onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};

export default Navbar;
