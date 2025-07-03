import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');
      
      gsap.set(words, {
        opacity: 0,
        y: 100,
      });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video/image container */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src="/assets/images/hero-bg.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-patriot-navy/80 via-patriot-navy/60 to-patriot-navy/80" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom section-padding text-center text-white">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 mask-gradient"
        >
          {['Building', 'a', 'Stronger', 'Fayette', 'County'].map((word, index) => (
            <span key={index} className="word inline-block mr-4">
              {word}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Join us in preserving liberty, promoting prosperity, and protecting the values that make our community great.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/donate"
            className="btn-primary text-lg px-8 py-4"
          >
            Contribute
          </Link>
          <Link
            to="/volunteer"
            className="btn-secondary text-lg px-8 py-4"
          >
            Volunteer
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;