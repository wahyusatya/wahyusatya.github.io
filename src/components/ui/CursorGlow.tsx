import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40 transition-opacity duration-300"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)',
      }}
      aria-hidden="true"
    />
  );
};
