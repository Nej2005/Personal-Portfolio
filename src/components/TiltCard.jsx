import React, { useRef, useState, useEffect } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.03,
  glare = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale}) translateZ(12px)`
    );

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePos({ x: glareX, y: glareY, opacity: 1 });
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transformStyle: 'preserve-3d',
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease-out, border-color 0.4s ease-out',
      }}
      className={`relative rounded-xl overflow-hidden will-change-transform transition-all duration-300 ${
        isHovered
          ? 'z-20 shadow-[0_22px_45px_-10px_rgba(0,0,0,0.18),0_12px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)] border-[#111111]/40 dark:border-white/40 -translate-y-1'
          : ''
      } ${className}`}
      {...props}
    >
      <div className="w-full h-full flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-30 pointer-events-none"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`,
          }}
        />
      )}
    </div>
  );
}
