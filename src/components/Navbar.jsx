// client/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        MyBlog
      </Link>

      <div className="ms-auto">
        <button onClick={handleLogout} className="btn btn-outline-light">
          Logout
        </button>
      </div>
    </nav>
  );
}
