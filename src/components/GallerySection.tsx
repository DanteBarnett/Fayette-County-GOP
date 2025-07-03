import { useState } from 'react';
import clsx from 'clsx';
import Container from './ui/Container';

const images = Array.from({ length: 9 }, (_, i) => `/gallery/${i + 1}.jpg`);

export default function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24">
      <Container>
        <h2 className="text-3xl font-serif font-bold text-center mb-12">Gallery</h2>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((src) => (
            <img
              key={src}
              src={src}
              alt="Gallery"
              className="w-full rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelected(src)}
            />
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
            onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}
            tabIndex={-1}
          >
            <img src={selected} alt="Large" className="max-h-full max-w-full object-contain" />
          </div>
        )}
      </Container>
    </section>
  );
}