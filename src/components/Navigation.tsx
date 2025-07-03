import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Disclosure as="nav" className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    )}>
      {({ open }) => (
        <>
          <div className={cn(
            'container-custom section-padding transition-all duration-300',
            isScrolled ? 'py-3' : 'py-6'
          )}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  className="flex-shrink-0"
                  aria-label="FCGOP Logo"
                >
                  <path
                    d="M50 50 L150 50 L150 100 L130 120 L100 130 L70 120 L50 100 Z"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="3"
                  />
                  <path
                    d="M100 70 L105 85 L120 85 L107 95 L113 110 L100 100 L87 110 L93 95 L80 85 L95 85 Z"
                    fill="#dc2626"
                  />
                </svg>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-serif font-bold text-patriot-navy leading-tight">
                    Fayette County
                  </h1>
                  <p className="text-sm font-sans text-patriot-red font-semibold">
                    Republican Party
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'text-base font-medium transition-colors duration-200',
                      location.pathname === item.href
                        ? 'text-patriot-red'
                        : 'text-gray-700 hover:text-patriot-navy'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden lg:block">
                <Link
                  to="/donate"
                  className="btn-primary"
                >
                  Donate
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-patriot-navy hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-patriot-red">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium',
                      location.pathname === item.href
                        ? 'bg-patriot-red text-white'
                        : 'text-gray-700 hover:text-patriot-navy hover:bg-gray-50'
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as={Link}
                  to="/donate"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-patriot-red text-white"
                >
                  Donate
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;