import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import Layout from '@/components/Layout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader for minimum 1 second
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="events"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <EventsPage />
            </Suspense>
          }
        />
        <Route
          path="news"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <NewsPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<div className="min-h-screen" />}>
              <ContactPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;