import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// Mock news data for demo
const mockNewsData = [
  {
    id: 1,
    title: 'County Commission Approves New Business Development Zone',
    excerpt: 'The Fayette County Commission voted unanimously to approve a new business development zone that will bring jobs and economic growth to our community.',
    date: '2024-01-10',
    author: 'John Smith',
    imageUrl: '/assets/images/news-1.jpg',
    category: 'Economic Development',
  },
  {
    id: 2,
    title: 'Local Republicans Lead Voter Registration Drive',
    excerpt: 'Over 500 new voters registered during last weekend\'s successful voter registration drive organized by the Fayette County GOP.',
    date: '2024-01-08',
    author: 'Jane Doe',
    imageUrl: '/assets/images/news-2.jpg',
    category: 'Community',
  },
  {
    id: 3,
    title: 'State Representative Visits Fayette County Schools',
    excerpt: 'State Rep. Mike Johnson toured local schools to discuss education reform and hear directly from teachers, parents, and students.',
    date: '2024-01-05',
    author: 'Bob Wilson',
    imageUrl: '/assets/images/news-3.jpg',
    category: 'Education',
  },
];

const fetchNews = async () => {
  // In production, this would fetch from RSS feed or API
  // For demo, we'll simulate an API delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNewsData;
};

const NewsCard = ({ article, index }: { article: typeof mockNewsData[0]; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-patriot-red text-white px-3 py-1 rounded-full text-xs font-semibold">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span className="mx-2">•</span>
          <span>{article.author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-patriot-navy mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link
          to={`/news/${article.id}`}
          className="inline-flex items-center text-patriot-red hover:text-patriot-redHover font-semibold transition-colors duration-200"
        >
          Read More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
};

const NewsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
            Latest News
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about what's happening in Fayette County
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading news. Please try again later.</p>
          </div>
        )}

        {articles && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/news" className="btn-primary">
                View All News
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;