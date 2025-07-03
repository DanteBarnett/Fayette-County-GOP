import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import Home from './pages/Home';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;