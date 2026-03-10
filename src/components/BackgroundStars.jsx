import React, { useMemo } from 'react';

const starColors = ['#aabfff', '#cad8ff', '#f8f7ff', '#fff4e8', '#ffd2a1', '#ffcc6f', '#ffa94d'];

export const generateStars = (count = 120) => {
    return Array.from({ length: count }).map(() => {
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
};

const BackgroundStars = ({ count = 120 }) => {
    const stars = useMemo(() => generateStars(count), [count]);
    return (
        <div className="stars-container" style={{ position: 'absolute', top: 0, left: 0, width: '200vw', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden', animation: 'oceanDrift 150s linear infinite' }}>
            {stars.map((style, i) => (
                <div key={`star-${i}`} style={{ position: 'absolute', borderRadius: '50%', animation: 'twinkle ease-in-out infinite alternate', willChange: 'opacity, transform', ...style }}></div>
            ))}
        </div>
    );
};

export default BackgroundStars;
