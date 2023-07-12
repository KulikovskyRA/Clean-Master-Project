import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/client">Client</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/cleaner">Cleaner</Link>

      <Link to="/register">Registration</Link>
    </>
  );
};

export default Navbar;
