import React, { useMemo } from 'react';

const BlinkingLights = ({ count = 15 }) => {
    // Cut the number of rendered lights in half on mobile to save battery
    const actualCount = window.innerWidth < 768 ? Math.ceil(count / 2) : count;

    const lights = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 8 + 6}s`, // 6s to 14s
            scale: Math.random() * 0.8 + 0.5,
        }));
    }, [actualCount]);

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
            {lights.map((style, i) => (
                <div key={`light-${i}`} style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    filter: 'blur(3px)',
                    background: 'radial-gradient(circle, rgba(255, 200, 100, 0.6) 0%, rgba(255, 150, 50, 0.2) 40%, transparent 80%)',
                    left: style.left,
                    top: style.top,
                    transform: `scale(${style.scale})`,
                    animation: `blinkLight ${style.animationDuration} ease-in-out infinite alternate`,
                    animationDelay: style.animationDelay,
                    opacity: 0, // Starts invisible
                }}></div>
            ))}
            <style>
                {`
                    @keyframes blinkLight {
                        0%, 15% { opacity: 0; transform: scale(0.8) translateY(0px); }
                        50%     { opacity: 0.5; transform: scale(1.4) translateY(-8px); }
                        85%, 100% { opacity: 0; transform: scale(0.8) translateY(-16px); }
                    }
                `}
            </style>
        </div>
    );
};

export default BlinkingLights;
