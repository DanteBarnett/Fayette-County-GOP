import React from 'react'
import Hero from '../components/Hero'

function HomePage() {
  return (
    <>
      <Hero />
      {/* TODO: Additional sections like Mission, Issues, Events, News, Gallery */}
      <section className="py-24 text-center text-gray-600">
        <p>More content coming soon...</p>
      </section>
    </>
  )
}

export default HomePage