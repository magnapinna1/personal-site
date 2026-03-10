import React, { useRef, useEffect } from 'react';

const NeutronStar = () => {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const TILT = -90 * (Math.PI / 180); // horizontal
    const STREAMS = 14;

    // Generate shared wave properties so both jets are synced
    const sharedWaves = Array.from({ length: STREAMS }, () => ({
      waveAmp: 15 + Math.random() * 25,
      waveFreq: 2.0 + Math.random() * 3,
      wavePhase: Math.random() * Math.PI * 2,
    }));

    const streams = Array.from({ length: STREAMS * 2 }, (_, i) => {
      const idx = i % STREAMS;
      return {
        jet: i < STREAMS ? -1 : 1,
        phase: idx / STREAMS * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.0,
        width: 2.5 + Math.random() * 5,
        spiralRate: 0.018 + Math.random() * 0.014,
        length: 0.5 + Math.random() * 0.3,
        hueBase: 210 + Math.random() * 30,
        opacity: 0.12 + Math.random() * 0.18,
        // Shared wave properties — synced across both jets
        waveAmp: sharedWaves[idx].waveAmp,
        waveFreq: sharedWaves[idx].waveFreq,
        wavePhase: sharedWaves[idx].wavePhase,
      };
    });

    let time = 0;

    const draw = () => {
      const w = W();
      const h = H();
      const cx = w * 0.5;
      const cy = h * 0.5;

      ctx.clearRect(0, 0, w, h);
      time += 0.014;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(TILT);
      ctx.translate(-cx, -cy);

      // Deep Space Plasma Glow (Replacing the CSS Nebulas)
      const plasmaPulse = Math.sin(time * 0.5) * 0.15 + 0.85; // Breathes between 0.7 and 1.0 opacity multiplier
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.8);
      bgGlow.addColorStop(0, `rgba(40, 60, 110, ${0.4 * plasmaPulse})`);
      bgGlow.addColorStop(0.3, `rgba(20, 30, 80, ${0.2 * plasmaPulse})`);
      bgGlow.addColorStop(0.8, 'transparent');
      
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, w * 0.8, 0, Math.PI * 2);
      ctx.fill();

      for (const stream of streams) {
        const spiralOffset = -time * stream.speed + stream.phase;
        const jetLen = h * stream.length;
        const steps = 70;

        ctx.beginPath();
        ctx.lineWidth = stream.width;
        ctx.lineCap = 'round';

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const dist = t * jetLen;

          const spiralAngle = spiralOffset - t * 18 * stream.spiralRate * 70;
          const spiralRadius = t * t * 70;

          // Wave: sinusoidal offset perpendicular to jet axis, grows with distance
          const wave = Math.sin(time * stream.waveFreq + t * 6 + stream.wavePhase) * stream.waveAmp * t;

          const px = cx + Math.cos(spiralAngle) * spiralRadius + wave;
          const py = cy + stream.jet * dist;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const grad = ctx.createLinearGradient(cx, cy, cx, cy + stream.jet * jetLen);
        const h1 = stream.hueBase;
        const h2 = stream.hueBase + 20;
        grad.addColorStop(0, `hsla(${h1}, 80%, 80%, ${stream.opacity * 1.5})`);
        grad.addColorStop(0.12, `hsla(${h1}, 70%, 68%, ${stream.opacity})`);
        grad.addColorStop(0.35, `hsla(${h2}, 60%, 55%, ${stream.opacity * 0.6})`);
        grad.addColorStop(0.65, `hsla(${h2}, 50%, 45%, ${stream.opacity * 0.2})`);
        grad.addColorStop(1, `hsla(${h2}, 40%, 35%, 0)`);

        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // Diffuse jet glow
      for (const dir of [-1, 1]) {
        const jetGlow = ctx.createLinearGradient(cx, cy, cx, cy + dir * h * 0.4);
        jetGlow.addColorStop(0, 'rgba(80, 140, 255, 0.06)');
        jetGlow.addColorStop(0.25, 'rgba(60, 110, 220, 0.03)');
        jetGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = jetGlow;
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy);
        ctx.lineTo(cx - 80, cy + dir * h * 0.4);
        ctx.lineTo(cx + 80, cy + dir * h * 0.4);
        ctx.lineTo(cx + 8, cy);
        ctx.closePath();
        ctx.fill();
      }

      // Outer halo
      const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      haloGrad.addColorStop(0, 'rgba(100, 160, 255, 0.1)');
      haloGrad.addColorStop(0.3, 'rgba(70, 130, 240, 0.05)');
      haloGrad.addColorStop(0.6, 'rgba(50, 100, 200, 0.015)');
      haloGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();

      // Core glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      coreGrad.addColorStop(0, 'rgba(230, 240, 255, 0.95)');
      coreGrad.addColorStop(0.15, 'rgba(160, 200, 255, 0.7)');
      coreGrad.addColorStop(0.4, 'rgba(80, 140, 255, 0.3)');
      coreGrad.addColorStop(0.7, 'rgba(50, 100, 220, 0.08)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // White-hot inner core
      const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 3);
      innerGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      innerGrad.addColorStop(0.6, 'rgba(200, 225, 255, 0.8)');
      innerGrad.addColorStop(1, 'rgba(140, 180, 255, 0)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 3,
      }}
    />
  );
};

export default NeutronStar;
