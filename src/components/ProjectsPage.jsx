import React from 'react';
import '../styles/ProjectsPage.css';
import BlinkingLights from './BlinkingLights';

const ProjectsPage = ({ effectsOn }) => (
  <div className={`project-wrapper ${effectsOn ? '' : 'effects-off'}`}>
    {/* Abstract atmospheric layers */}
    <div className="proj-atmosphere" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 1.2s ease' }}>
      <div className="murk-layer murk-1"></div>
      <div className="murk-layer murk-2"></div>
      <div className="murk-layer murk-3"></div>
      <div className="distant-warmth"></div>
      <div className="proj-fog"></div>
      <div className="proj-grain"></div>
      <BlinkingLights />
    </div>
    <div className="section-content">
      <h2 className="page-title">Projects and Experience</h2>
      <div className="project-grid">
        <div className="project-item">
          <h3>Vulnerability Scanning Audit Automation</h3>
          <p>Python FastAPI + React app automating Qualys audit evidence gathering and reporting. Saves engineering teams hours of otherwise manual work.</p>
        </div>
        <div className="project-item">
          <h3>Data Platform Transformation Library</h3>
          <p>Java + Apache Spark transformation libraries powering an internal data platform that processes billions of records for multiple lending products. Built the data backend for Chase Pay-In-4.</p>
        </div>
        <div className="project-item">
          <h3>This website</h3>
          <p>React + Vanilla CSS + Vite + GitHub Pages + Claude</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectsPage;
