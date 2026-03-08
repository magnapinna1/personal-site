import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import SideNav from './components/SideNav';

function AppContent() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [effectsOn, setEffectsOn] = useState(true);
  const location = useLocation();
  
  const lastBlogPath = React.useRef(location.pathname.startsWith('/blog') ? location.pathname : '/blog');
  if (location.pathname.startsWith('/blog')) {
    lastBlogPath.current = location.pathname;
  }
  
  const isPath = (target) => {
    const current = location.pathname.toLowerCase();
    if (target === '/') return current === '/';
    return current.startsWith(target.toLowerCase());
  };

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '').split('/')[0];

  useEffect(() => {
    const isBlogPath = (path) => path.toLowerCase().startsWith('/blog');

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const preventDefault = (e) => {
      if (isBlogPath(location.pathname)) return; 
      if (e.target.closest('.scrollable-content')) return;
      e.preventDefault();
    };
    const preventKeys = (e) => {
      const keys = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'];
      if (isBlogPath(location.pathname) || e.target.closest('.scrollable-content')) return;
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventKeys);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [location.pathname]);

  // Global Scroll Reset safety
  useEffect(() => {
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) {
      activeSection.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className={`app-root theme-${currentPage}`} style={{ '--m-x': `${mousePos.x}px`, '--m-y': `${mousePos.y}px` }}>
      <SideNav />
      <button className="effects-toggle" onClick={() => setEffectsOn(prev => !prev)} title={effectsOn ? "Disable Effects" : "Enable Effects"}>
        {effectsOn ? "[ AMBIANCE: ON ]" : "[ AMBIANCE: OFF ]"}
      </button>

      <div className="page-wrapper">
        <section id="home" className={`page-section ${isPath('/') ? 'active' : ''}`}>
          <HomePage effectsOn={effectsOn} mousePos={mousePos} />
        </section>
        <section id="projects" className={`page-section ${isPath('/projects') ? 'active' : ''}`}>
          <ProjectsPage effectsOn={effectsOn} />
        </section>
        <section id="blog" className={`page-section ${isPath('/blog') ? 'active' : ''}`}>
          {lastBlogPath.current === '/blog' || lastBlogPath.current === '/blog/'
            ? <BlogPage effectsOn={effectsOn} isActive={isPath('/blog')} />
            : <BlogPostPage effectsOn={effectsOn} />
          }
        </section>
      </div>

      <Routes>
        <Route path="/" element={null} />
        <Route path="/projects" element={null} />
        <Route path="/blog/*" element={null} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
