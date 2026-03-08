import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SideNav.css';

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pages = [
    { id: 'home', path: '/' },
    { id: 'projects', path: '/projects' },
    { id: 'blog', path: '/blog' }
  ];

  return (
    <nav className="side-nav">
      {pages.map(page => {
        const isActive = page.path === '/' ? location.pathname === '/' : location.pathname.toLowerCase().startsWith(page.path.toLowerCase());
        return (
          <div 
            key={page.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(page.path)}
          >
            <span className="nav-label">{page.id}</span>
            <div className="nav-dot"></div>
          </div>
        );
      })}
    </nav>
  );
};

export default SideNav;
