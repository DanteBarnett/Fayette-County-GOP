import React from 'react';
import clsx from 'clsx';
import Button from './ui/Button';
import { useStickyCTA } from '../hooks/useStickyCTA';

export default function StickyCTA() {
  const visible = useStickyCTA();

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 transition-transform',
        visible ? 'scale-100' : 'scale-0',
      )}
    >
      <div className="rounded-full shadow-lg bg-primary text-white flex items-center">
        <Button variant="primary" as="a" href="#contribute" className="rounded-r-none">
          Contribute
        </Button>
        <Button
          variant="outline"
          as="a"
          href="#volunteer"
          className="rounded-l-none border-l-0 text-white"
        >
          Volunteer
        </Button>
      </div>
    </div>
  );
}