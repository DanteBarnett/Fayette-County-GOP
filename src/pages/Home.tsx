import Hero from '../components/Hero';
import MissionSection from '../components/MissionSection';
import TopIssuesSection from '../components/TopIssuesSection';
import EventsSection from '../components/EventsSection';
import NewsSection from '../components/NewsSection';
import GallerySection from '../components/GallerySection';

export default function Home() {
  return (
    <>
      <Hero />
      <MissionSection />
      <TopIssuesSection />
      <EventsSection />
      <NewsSection />
      <GallerySection />
    </>
  );
}