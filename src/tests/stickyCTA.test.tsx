import { render } from '@testing-library/react';
import StickyCTA from '../components/StickyCTA';

describe('StickyCTA visibility', () => {
  it('is hidden initially', () => {
    const { container } = render(<StickyCTA />);
    const cta = container.firstChild as HTMLElement;
    expect(cta).toHaveClass('scale-0');
  });
});