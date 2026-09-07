import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CirclePlus,
  LogOut,
} from "lucide-react";
import "../styles/layout.css";
export default function Layout() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
      <aside className={`layout-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <nav className="sidebar-nav">
          <NavLink to="/home" className="sidebar-link">
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/applications" className="sidebar-link">
            <BriefcaseBusiness size={17} />
            <span>My Applications</span>
          </NavLink>
          <NavLink to="/add" className="sidebar-link">
            <CirclePlus size={17} />
            <span>Add Application</span>
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {/* RIGHT SIDE */}
      <div className="app-right">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <h2 className="logo">
              💼 Job<span>Tracker</span>
            </h2>
          </div>

          <div className="topbar-user-wrapper">
            <button
              className="topbar-user"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <span>{userName}</span>
              <span className="user-menu-arrow">
                {showUserMenu ? "▲" : "▼"}
              </span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
