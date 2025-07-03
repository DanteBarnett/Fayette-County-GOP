import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div className="relative">
          {/* Logo animation container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            {/* County outline SVG */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              className="mx-auto"
              aria-label="Fayette County Republican Party Logo"
            >
              {/* Simplified county outline */}
              <motion.path
                d="M50 50 L150 50 L150 100 L130 120 L100 130 L70 120 L50 100 Z"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              
              {/* Flag stars */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <path
                  d="M100 70 L105 85 L120 85 L107 95 L113 110 L100 100 L87 110 L93 95 L80 85 L95 85 Z"
                  fill="#dc2626"
                />
              </motion.g>
            </svg>
            
            {/* Text below logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <h1 className="text-2xl font-serif font-bold text-patriot-navy">
                Fayette County
              </h1>
              <p className="text-lg font-sans text-patriot-red font-semibold">
                Republican Party
              </p>
            </motion.div>
          </motion.div>
          
          {/* Loading spinner */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="spinner"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;