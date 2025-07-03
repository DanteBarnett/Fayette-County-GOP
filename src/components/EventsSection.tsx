import Container from './ui/Container';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from './ui/Spinner';
import { motion } from 'framer-motion';

type Event = { id: number; title: string; date: string; location: string };

export default function EventsSection() {
  const { data, isLoading } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: () => axios.get('/static/mockData.json').then((res) => res.data.events as Event[]),
  });

  return (
    <section id="events" className="py-24">
      <Container>
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Upcoming Events</h2>
        {isLoading && <Spinner />}
        {data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="mt-2">{event.location}</p>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}