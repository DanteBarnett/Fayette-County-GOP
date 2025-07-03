import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import MissionSection from '@/components/sections/MissionSection';
import IssuesSection from '@/components/sections/IssuesSection';
import EventsSection from '@/components/sections/EventsSection';
import NewsSection from '@/components/sections/NewsSection';
import GallerySection from '@/components/sections/GallerySection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <IssuesSection />
      <EventsSection />
      <NewsSection />
      <GallerySection />
    </>
  );
};

export default HomePage;