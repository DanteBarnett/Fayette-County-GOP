import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const issues = [
  {
    title: 'Economic Growth',
    front: 'Supporting local businesses and reducing regulations',
    back: 'We believe in free-market principles that allow businesses to thrive. By reducing unnecessary regulations and taxes, we can create more jobs and opportunities for all residents of Fayette County.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Education Excellence',
    front: 'Empowering parents and improving schools',
    back: 'Parents should have a voice in their children\'s education. We support school choice, academic excellence, and keeping political agendas out of the classroom.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Public Safety',
    front: 'Supporting law enforcement and first responders',
    back: 'Safe communities are prosperous communities. We stand with our police officers, firefighters, and first responders who work tirelessly to protect our families and property.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const IssueCard = ({ issue, index }: { issue: typeof issues[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative h-80 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-white shadow-lg border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
          <div className="text-patriot-red mb-4">{issue.icon}</div>
          <h3 className="text-2xl font-bold text-patriot-navy mb-3">{issue.title}</h3>
          <p className="text-gray-600">{issue.front}</p>
          <div className="absolute bottom-4 text-sm text-gray-400">Hover to learn more →</div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-patriot-navy text-white shadow-lg p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">{issue.title}</h3>
          <p className="text-gray-100 leading-relaxed">{issue.back}</p>
        </div>
      </div>
    </motion.div>
  );
};

const IssuesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-patriot-navy mb-4">
            Top Issues
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're focused on the issues that matter most to Fayette County families
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {issues.map((issue, index) => (
            <IssueCard key={index} issue={issue} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default IssuesSection;