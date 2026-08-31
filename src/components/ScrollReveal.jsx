import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.08,
  once = false,
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current - 5) {
        setScrollDirection('up');
      } else if (currentScrollY > lastScrollY.current + 5) {
        setScrollDirection('down');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScrollDir, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDir);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin: '10px 0px -20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, once]);

  const getAnimationStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
        filter: 'blur(0px)',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      };
    }

    let initialTransform = 'translate3d(0, 36px, 0)';
    if (scrollDirection === 'up' && animation === 'fade-up') {
      initialTransform = 'translate3d(0, -36px, 0)';
    } else if (animation === 'fade-down') {
      initialTransform = 'translate3d(0, -36px, 0)';
    } else if (animation === 'slide-right') {
      initialTransform = 'translate3d(-40px, 0, 0)';
    } else if (animation === 'slide-left') {
      initialTransform = 'translate3d(40px, 0, 0)';
    } else if (animation === 'scale-up') {
      initialTransform = 'scale(0.9) translate3d(0, 20px, 0)';
    } else if (animation === 'fade-in') {
      initialTransform = 'translate3d(0, 0, 0)';
    }

    return {
      opacity: 0,
      transform: initialTransform,
      filter: 'blur(4px)',
      transition: `opacity 250ms ease-out 0ms, transform 250ms ease-out 0ms, filter 250ms ease-out 0ms`,
      willChange: 'opacity, transform, filter',
    };
  };

  return (
    <div
      ref={ref}
      style={{
        ...getAnimationStyles(),
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
