import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const links = [
  { name: 'Mission', href: '#mission' },
  { name: 'Issues', href: '#issues' },
  { name: 'Events', href: '#events' },
  { name: 'News', href: '#news' },
  { name: 'Gallery', href: '#gallery' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'h-16 backdrop-blur bg-white/70 shadow-sm' : 'h-24',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-4">
        <Link to="/" className="font-serif text-xl font-bold text-primary">
          FCRP
        </Link>
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <a key={l.name} href={l.href} className="text-sm font-medium hover:text-primary">
              {l.name}
            </a>
          ))}
        </nav>
        <Button as="a" href="https://secure.winred.com" variant="primary" size="sm">
          Donate
        </Button>
      </div>
    </header>
  );
}