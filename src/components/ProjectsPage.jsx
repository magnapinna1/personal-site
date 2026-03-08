import React from 'react';
import '../styles/ProjectsPage.css';

const ProjectsPage = ({ effectsOn }) => (
  <div className="project-wrapper">
    {/* Abstract atmospheric layers */}
    <div className="proj-atmosphere" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 1.2s ease' }}>
      <div className="murk-layer murk-1"></div>
      <div className="murk-layer murk-2"></div>
      <div className="murk-layer murk-3"></div>
      <div className="distant-warmth"></div>
      <div className="proj-fog"></div>
      <div className="proj-grain"></div>
    </div>
    <div className="section-content">
      <h2 className="page-title">Selected Work</h2>
      <div className="project-grid">
        <div className="project-item">
          <h3>Vulerability Scanning Audit Automation</h3>
          <p>Python FastAPI + React app to automate Qualys audit evidence gathering and reporting. I save our engineering teams lots of time on an otherwise very tedious process.</p>
        </div>
        <div className="project-item">
          <h3>Data Platform Transformation Library</h3>
          <p>Java + Apache Spark transformation libraries powering internal data platform processing billions of records for multiple lending products. I helped build the data backend for Chase Pay-In-4!</p>
        </div>
        <div className="project-item">
          <h3>This website</h3>
          <p>React + Tailwind CSS + Vite + GitHub Pages + Claude</p>
        </div>
        <div className="project-item">
          <h3>Super Smash / Super Mario Bros Game</h3>
          <p>C# + Monogame. I worked with a team to build a Smash style game within Super Mario Bros.</p>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectsPage;
