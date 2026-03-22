import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SideNav.css';

const SideNav = ({ effectsOn, setEffectsOn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pages = [
    { id: 'home', path: '/' },
    { id: 'projects', path: '/projects' },
    { id: 'words', path: '/words' }
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
      
      {/* Integrated Ambiance Toggle */}
      <div 
        className={`nav-item ${effectsOn ? 'active' : ''}`} 
        onClick={() => setEffectsOn(prev => !prev)}
        style={{ marginTop: '20px' }}
      >
        <span className="nav-label">Ambiance</span>
        <div className="nav-dot" style={{ borderRadius: '50%', height: effectsOn ? '12px' : '8px', width: effectsOn ? '12px' : '8px' }}></div>
      </div>
    </nav>
  );
};

export default SideNav;
