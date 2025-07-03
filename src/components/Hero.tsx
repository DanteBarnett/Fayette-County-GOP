import React from 'react';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import Button from './ui/Button';
import Container from './ui/Container';
import Spinner from './ui/Spinner';
import { useSplitTextAnimation } from '../hooks/useSplitTextAnimation';

export default function Hero() {
  const headingText = 'Fayette County Republican Party';
  const headingRef = useSplitTextAnimation(headingText);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.to('#loading-overlay', { opacity: 0, duration: 0.5, pointerEvents: 'none' });
    }
  }, [loading]);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-[url('/hero.jpg')] bg-cover bg-center"
    >
      {/* Loading overlay */}
      <div
        id="loading-overlay"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 60"
          className="w-32 text-primary mb-6"
          fill="currentColor"
        >
          <rect x="0" y="20" width="100" height="20" rx="4" />
          <polygon points="0,40 20,60 100,60 80,40" />
        </svg>
        <Spinner />
      </div>

      <Container className="text-center text-white relative z-10">
        <h1
          ref={headingRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg"
        >
          {headingText}
        </h1>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" size="lg" href="#contribute" as="a">
            Contribute
          </Button>
          <Button variant="outline" size="lg" href="#volunteer" as="a">
            Volunteer
          </Button>
        </div>
      </Container>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
    </section>
  );
}