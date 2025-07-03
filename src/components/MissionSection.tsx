import React from 'react';
import Container from './ui/Container';

export default function MissionSection() {
  return (
    <section id="mission" className="py-24">
      <Container className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="/mission.jpg"
          alt="Mission"
          className="w-full h-64 object-cover rounded-lg shadow-lg md:h-full md:max-h-[400px]"
        />
        <div>
          <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            We believe in constitutional principles, fiscal responsibility, and preserving individual
            liberties for every resident of Fayette County.
          </p>
          <p>
            Our organization supports local candidates, engages citizens, and promotes policies that
            foster economic growth, strong families, and community well-being.
          </p>
        </div>
      </Container>
    </section>
  );
}