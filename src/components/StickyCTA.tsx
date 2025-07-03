import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-white rounded-full shadow-2xl p-1 flex items-center space-x-2">
            <Link
              to="/donate"
              className="btn-primary rounded-full text-sm"
              aria-label="Contribute to Fayette County GOP"
            >
              Contribute
            </Link>
            <Link
              to="/volunteer"
              className="btn-secondary rounded-full text-sm"
              aria-label="Volunteer with Fayette County GOP"
            >
              Volunteer
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;