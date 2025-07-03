import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useSplitTextAnimation(text: string) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      const words = ref.current.textContent!.split(' ');
      ref.current.innerHTML = words
        .map((w) => `<span class="inline-block opacity-0">${w} </span>`) // keep space
        .join('');
      gsap.fromTo(
        ref.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out',
          duration: 0.6,
        },
      );
    }
  }, [text]);

  return ref;
}