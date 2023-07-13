import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

    <div className="nav">
      <Link className="nav-link" to="/">
        Home Care
      </Link>
      <Link className="nav-link" to="/client">
        Личный кабинет
      </Link>
    </div>

  );
};

export default Navbar;
