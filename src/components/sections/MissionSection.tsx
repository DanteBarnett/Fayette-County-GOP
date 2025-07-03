import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MissionSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current && inView) {
        const scrollY = window.scrollY;
        const element = parallaxRef.current;
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate parallax offset
        const parallaxSpeed = 0.5;
        const yPos = -(scrollY - elementTop) * parallaxSpeed;
        
        // Only apply parallax when element is in viewport
        if (scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView]);

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div 
              ref={parallaxRef}
              className="relative aspect-[4/5] parallax"
            >
              <img
                src="/assets/images/mission-image.jpg"
                alt="Fayette County community gathering"
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-patriot-red/10 rounded-lg -z-10" />
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-patriot-navy mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                The Fayette County Republican Party is dedicated to promoting conservative principles, 
                fostering community engagement, and electing leaders who share our values of limited government, 
                individual liberty, and fiscal responsibility.
              </p>
              <p className="text-lg leading-relaxed">
                We believe in the power of grassroots activism and the importance of every citizen's voice 
                in shaping our community's future. Through education, outreach, and active participation 
                in the democratic process, we work to ensure that Fayette County remains a beacon of 
                prosperity and freedom.
              </p>
              <p className="text-lg leading-relaxed">
                Join us in our mission to preserve the American dream for future generations, protect our 
                constitutional rights, and build a stronger, more prosperous community for all.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/about"
                className="inline-flex items-center text-patriot-red font-semibold hover:text-patriot-redHover transition-colors duration-200"
              >
                Learn more about our values
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;