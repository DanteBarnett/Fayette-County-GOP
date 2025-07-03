import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import EventsTeaser from './components/EventsTeaser'

function App() {
  return (
    <>
      <NavBar />
      <Hero
        title="Fayette County Republican Party"
        subtitle="Faith • Family • Freedom"
        buttons={[
          { label: 'Donate', href: '/donate/' },
          { label: 'Volunteer', href: '/volunteer/' },
          { label: 'Join Newsletter', href: '/newsletter/' },
        ]}
      />
      <Mission html="<p>Our mission is to promote conservative values and support Republican candidates at every level of government.</p>" />
      <EventsTeaser />
    </>
  )
}

export default App