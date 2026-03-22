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
  const [effectsOn, setEffectsOn] = useState(() => {
    const saved = localStorage.getItem('ambiance_effects');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const location = useLocation();

  // Persist the ambiance toggle state whenever it changes
  useEffect(() => {
    localStorage.setItem('ambiance_effects', JSON.stringify(effectsOn));
  }, [effectsOn]);

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '').split('/')[0];

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.pageX, y: e.pageY });
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        setMousePos({ x: e.touches[0].pageX, y: e.touches[0].pageY });
      }
    };
    const handleTouchEnd = () => {
      // Clear glow effect by moving it way off screen when touch ends
      setMousePos({ x: -9999, y: -9999 });
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Global Scroll Reset safety on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`app-root theme-${currentPage}`} style={{ '--m-x': `${mousePos.x}px`, '--m-y': `${mousePos.y}px` }}>
      <SideNav effectsOn={effectsOn} setEffectsOn={setEffectsOn} />

      <main className={`page-scroll-container ${effectsOn ? 'page-transition-enabled' : ''}`} key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage effectsOn={effectsOn} mousePos={mousePos} />} />
          <Route path="/projects" element={<ProjectsPage effectsOn={effectsOn} />} />
          <Route path="/words" element={<BlogPage effectsOn={effectsOn} />} />
          <Route path="/words/*" element={<BlogPostPage effectsOn={effectsOn} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
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
