import React, { useMemo } from 'react';
import '../styles/HomePage.css';

const generateCurvedPath = (startX, startY, length, variance) => {
  let d = `M ${startX} ${startY}`;
  let currentX = startX;
  let currentY = startY;
  for (let i = 0; i < 2; i++) {
    const cp1x = currentX + (Math.random() * variance - variance / 2);
    const cp1y = currentY + length / 2;
    const cp2x = currentX + (Math.random() * variance - variance / 2);
    const cp2y = currentY + length;
    currentX = currentX + (Math.random() * (variance / 2) - variance / 4);
    currentY = currentY + length;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentX} ${currentY}`;
  }
  return d;
};

const starColors = ['#aabfff', '#cad8ff', '#f8f7ff', '#fff4e8', '#ffd2a1', '#ffcc6f', '#ffa94d'];

const CONSTANT_STARS = Array.from({ length: 120 }).map(() => {
  const color = starColors[Math.floor(Math.random() * starColors.length)];
  const size = Math.random() * 1.5 + 0.5;
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    boxShadow: `0 0 ${size * 3}px ${color}`,
  };
});

let _strands = null;
const getStrands = () => {
  if (_strands) return _strands;
  _strands = Array.from({ length: 30 }).map(() => {
    const startX = (Math.random() * 1.5 - 0.25) * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const length = Math.random() * 10 + 5;
    const variance = 10;
    const baseHue = Math.floor(Math.random() * 360);
    const baseRotation = Math.random() * 360;
    return {
      path: generateCurvedPath(startX, startY, length, variance),
      delay: Math.random() * 10,
      duration: Math.random() * 5 + 6,
      driftSpeed: Math.random() * 80 + 40,
      driftOffset: Math.random() * 100,
      baseHue,
      baseRotation,
    };
  });
  return _strands;
};

const PulsingWaves = () => (
  <div className="wave-container">
    <div className="wave wave-1"></div>
    <div className="wave wave-2"></div>
    <div className="wave wave-3"></div>
  </div>
);

const DarkClouds = () => (
  <div className="clouds-container">
    <div className="cloud-layer cloud-back"></div>
    <div className="cloud-layer cloud-front"></div>
  </div>
);

const HiddenStars = () => (
  <div className="stars-container">
    {CONSTANT_STARS.map((style, i) => (
      <div key={`star-${i}`} className="star" style={style}></div>
    ))}
  </div>
);

const CombJelliesSVG = () => (
  <div className="jelly-container">
    <svg className="jelly-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {getStrands().map((strand, i) => (
        <g key={`strand-group-${i}`} className="drifting-group" style={{
          animationDuration: `${strand.driftSpeed}s`,
          animationDelay: `-${strand.driftOffset}s`,
          '--jelly-hue': `${strand.baseHue}deg`,
          transformOrigin: '50% 50%'
        }}>
          {/* Group wrapper to handle the base rotation while leaving the animation transform alone */}
          <g style={{ transform: `rotate(${strand.baseRotation}deg)`, transformOrigin: 'center' }}>
            <path d={strand.path} fill="none" stroke="hsl(var(--jelly-hue), 10%, 15%)" strokeWidth="1" />
            <path d={strand.path} fill="none" strokeWidth="3" strokeLinecap="round" filter="url(#softGlow)" className="pulse-outer pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
            <path d={strand.path} fill="none" strokeWidth="2" strokeLinecap="round" className="pulse-mid pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
            <path d={strand.path} fill="none" strokeWidth="1" strokeLinecap="round" className="pulse-core pulse-path" style={{ animationDuration: `${strand.duration}s`, animationDelay: `-${strand.delay}s` }} />
          </g>
        </g>
      ))}
    </svg>
  </div>
);

const HomePage = ({ effectsOn, mousePos }) => (
  <div className="portfolio-wrapper">
    <div className="effects-layer mouse-reveal" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <HiddenStars /><CombJelliesSVG />
    </div>
    <div className="interactive-glow" style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 0.8s ease', background: `radial-gradient(600px circle at var(--m-x) var(--m-y), rgba(42, 69, 100, 0.15), transparent 60%)`, boxShadow: `inset 0 0 100px rgba(188, 250, 255, 0.05)`, filter: `hue-rotate(${mousePos.x % 360}deg)` }}></div>
    <div style={{ opacity: effectsOn ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <DarkClouds /><PulsingWaves />
    </div>
    <main className="main-content">
      <div className="glass-card">
        <div className="card-inner">
          <div className="left-column">
            <div className="profile-frame"><img src="./20230328_152422.jpg" alt="Profile Pic" className="profile-pic" /></div>
            <nav className="links-nav">
              <a href="#github" className="nav-link">Github</a>
              <a href="https://www.linkedin.com/in/michael-morrill-591736177/" className="nav-link">LinkedIn</a>
              <a href="mailto:mmorrill99@gmail.com" className="nav-link">Email</a>
            </nav>
          </div>
          <div className="right-column">
            <header className="header-group">
              <h1 className="name-title">Michael Morrill</h1>
              <div className="separator"></div>
              <h2 className="role-title">Security Software Engineer</h2>
            </header>
            <div className="bio-content">
              <p>I'm a Software Engineer working in Cybersecurity at JPMorganChase. I mainly use Python and Java to build cool stuff.</p>
              <p>Check out my projects page to see some of that cool stuff.</p>
            </div>
            <div className="skills-section">
              <h3 className="section-label">Core Expertise</h3>
              <div className="skills-list">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Python (FastAPI)</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Kubernetes</span>
                <span className="skill-tag">AWS (EKS, DynamoDB, Lambda)</span>
                <span className="skill-tag">Apache Spark</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">Terraform</span>
                <span className="skill-tag">Qualys / Security</span>
                <span className="skill-tag">Not Leetcode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
