import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";
import logo from "../Images/Logo.png";

function NavBar() {
  const { isAuth, setAuthState, roleState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState((prev) => ({
      ...prev,
      isAuth: false,
      role: "" // clear role on logout
    }));
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="TekaroQ Logo" className="navbar-logo" />
        </div>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>

          {isAuth ? (
            <>
              <NavLink to="/profile">Profile</NavLink>

              {/* ✅ Role-based QuestionSet link */}
              {roleState === "admin" ? (
                <NavLink to="/admin/questionset/create">Create Question</NavLink>
              ) : (
                <NavLink to="/questionset/list">Question Set</NavLink>
              )}

              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
