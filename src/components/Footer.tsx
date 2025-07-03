import React from 'react';
import Container from './ui/Container';

const sitemap = {
  About: [
    { label: 'Mission', href: '#mission' },
    { label: 'Leadership', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  'Get Involved': [
    { label: 'Volunteer', href: '#volunteer' },
    { label: 'Donate', href: '#contribute' },
    { label: 'Events', href: '#events' },
  ],
  Resources: [
    { label: 'News', href: '#news' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 mt-auto">
      <Container className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold">FCRP</h3>
          <p className="mt-4 text-sm">
            Paid for by the Fayette County Republican Party. Not authorized by any candidate or
            candidate's committee.
          </p>
        </div>
        {Object.entries(sitemap).map(([section, links]) => (
          <div key={section}>
            <h4 className="font-semibold uppercase tracking-wide mb-4">{section}</h4>
            <ul className="space-y-2">
              {(links as any).map((l: any) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-semibold uppercase tracking-wide mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.778-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}