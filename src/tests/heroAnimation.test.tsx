import { render } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero Animation', () => {
  it('splits text into multiple spans for animation', () => {
    const { container } = render(<Hero />);
    const spans = container.querySelectorAll('h1 span');
    expect(spans.length).toBeGreaterThan(1);
  });
});