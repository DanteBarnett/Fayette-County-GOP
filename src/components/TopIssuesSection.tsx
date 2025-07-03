import React from 'react';
import Container from './ui/Container';
import { motion } from 'framer-motion';

const issues = [
  { title: 'Economic Growth', description: 'Lower taxes and fewer regulations.' },
  { title: 'Education', description: 'Empower parents and support teachers.' },
  { title: 'Public Safety', description: 'Support law enforcement and safe communities.' },
];

export default function TopIssuesSection() {
  return (
    <section id="issues" className="bg-gray-50 py-24">
      <Container>
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Top Issues</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <motion.div
              key={issue.title}
              className="bg-white shadow-lg rounded-lg p-6 perspective-1000"
              whileHover={{ rotateY: 10 }}
            >
              <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
              <p>{issue.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}