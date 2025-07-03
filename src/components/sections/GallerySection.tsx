import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const galleryImages = [
  {
    id: 1,
    src: '/assets/images/gallery-1.jpg',
    thumbnail: '/assets/images/gallery-1-thumb.jpg',
    width: 1200,
    height: 800,
    alt: 'Lincoln Day Dinner 2023',
    caption: 'Lincoln Day Dinner 2023 - Celebrating our heritage',
  },
  {
    id: 2,
    src: '/assets/images/gallery-2.jpg',
    thumbnail: '/assets/images/gallery-2-thumb.jpg',
    width: 800,
    height: 1200,
    alt: 'Volunteer Training Session',
    caption: 'Volunteers preparing for the upcoming campaign',
  },
  {
    id: 3,
    src: '/assets/images/gallery-3.jpg',
    thumbnail: '/assets/images/gallery-3-thumb.jpg',
    width: 1200,
    height: 800,
    alt: 'Community BBQ Event',
    caption: 'Annual Community BBQ bringing neighbors together',
  },
  {
    id: 4,
    src: '/assets/images/gallery-4.jpg',
    thumbnail: '/assets/images/gallery-4-thumb.jpg',
    width: 800,
    height: 800,
    alt: 'Youth Leadership Program',
    caption: 'Inspiring the next generation of conservative leaders',
  },
  {
    id: 5,
    src: '/assets/images/gallery-5.jpg',
    thumbnail: '/assets/images/gallery-5-thumb.jpg',
    width: 1200,
    height: 800,
    alt: 'Voter Registration Drive',
    caption: 'Making democracy accessible to all citizens',
  },
  {
    id: 6,
    src: '/assets/images/gallery-6.jpg',
    thumbnail: '/assets/images/gallery-6-thumb.jpg',
    width: 800,
    height: 1200,
    alt: 'Flag Day Celebration',
    caption: 'Honoring our flag and what it represents',
  },
];

const GallerySection = () => {
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
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing moments from our events and activities
          </p>
        </motion.div>

        <Gallery>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-lg ${
                  index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <Item
                  original={image.src}
                  thumbnail={image.thumbnail}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  caption={image.caption}
                >
                  {({ ref: itemRef, open }) => (
                    <div
                      ref={itemRef}
                      onClick={open}
                      className="relative group cursor-pointer h-full"
                    >
                      <img
                        src={image.thumbnail}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  )}
                </Item>
              </motion.div>
            ))}
          </div>
        </Gallery>
      </div>
    </section>
  );
};

export default GallerySection;