import "./App.css";
import {BrowserRouter, Link, Route, Routes, useLocation,} from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Home, Users, Info, Phone, Settings, BarChart } from "lucide-react";
import UserDetailPage from "./pages/UserDetaillPage";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Users size={28} />
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${isActive("/")}`}>
          <Home size={20} />
          <span className="nav-tooltip">Home</span>
        </Link>
        <Link to="/users" className={`nav-item ${isActive("/users")}`}>
          <Users size={20} />
          <span className="nav-tooltip">Users</span>
        </Link>
        <Link to="/analytics" className={`nav-item ${isActive("/analytics")}`}>
          <BarChart size={20} />
          <span className="nav-tooltip">Analytics</span>
        </Link>
        <Link to="/about" className={`nav-item ${isActive("/about")}`}>
          <Info size={20} />
          <span className="nav-tooltip">About</span>
        </Link>
        <Link to="/contact" className={`nav-item ${isActive("/contact")}`}>
          <Phone size={20} />
          <span className="nav-tooltip">Contact</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span className="nav-tooltip">Settings</span>
        </button>
      </div>
    </aside>
  );
};

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Users Data</h1>
      </div>
      <div className="topbar-right">
        <input
          type="search"
          placeholder="Search users..."
          className="search-input"
        />
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">💬</button>
        <div className="user-profile">
          <span>Janna of Joker</span>
          <div className="avatar">JJ</div>
        </div>
      </div>
    </header>
  );
};

function AppContent() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="page-container">

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<HomePage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
          </Routes>
          
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
