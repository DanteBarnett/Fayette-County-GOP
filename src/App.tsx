import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import StickyCTA from './components/StickyCTA'
import HomePage from './pages/Home'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <NavBar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* TODO: other routes */}
          </Routes>
        </main>

        <StickyCTA />
      </div>
    </Router>
  )
}

export default App