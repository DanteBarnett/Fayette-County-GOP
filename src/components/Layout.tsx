import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      <Navigation />
      
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      <StickyCTA />
    </div>
  );
};

export default Layout;