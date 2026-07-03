import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const userName = user?.name || "";

  return (
    <div className="layout">
      <nav className="layout navbar">
        <div className="navbar-left">
          <h2>Job Application Tracker</h2>
        </div>
        <div className="navbar-right">
          <span className="greeting">Hi, {userName}!</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

        