import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Monthly Meeting',
    date: 'January 15, 2024',
    time: '7:00 PM',
    location: 'County Community Center',
    description: 'Join us for our monthly meeting to discuss upcoming initiatives and hear from local candidates.',
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Volunteer Training',
    date: 'January 22, 2024',
    time: '6:00 PM',
    location: 'GOP Headquarters',
    description: 'Learn how to effectively canvass, phone bank, and support our candidates.',
    type: 'training',
  },
  {
    id: 3,
    title: 'Lincoln Day Dinner',
    date: 'February 12, 2024',
    time: '6:30 PM',
    location: 'Grand Ballroom',
    description: 'Our annual fundraising dinner featuring keynote speakers and awards ceremony.',
    type: 'fundraiser',
  },
  {
    id: 4,
    title: 'Voter Registration Drive',
    date: 'February 20, 2024',
    time: '10:00 AM',
    location: 'Various Locations',
    description: 'Help register new voters and ensure our community is ready for the upcoming elections.',
    type: 'outreach',
  },
];

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  training: 'bg-green-100 text-green-800',
  fundraiser: 'bg-purple-100 text-purple-800',
  outreach: 'bg-orange-100 text-orange-800',
};

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${typeColors[event.type as keyof typeof typeColors]}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
            <h3 className="text-xl font-bold text-patriot-navy mt-2">{event.title}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-600">{event.date}</p>
            <p className="text-sm text-gray-500">{event.time}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
          
          <button className="text-patriot-red hover:text-patriot-redHover font-semibold text-sm transition-colors duration-200">
            Learn More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const EventsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-patriot-navy mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get involved and make a difference in your community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/events"
            className="btn-primary"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;