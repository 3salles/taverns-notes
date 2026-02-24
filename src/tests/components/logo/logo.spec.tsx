import { Logo } from '@/components/logo';
import { render, screen } from '@/lib/test-utils';

describe('Logo', () => {
  it('should render link to home page', () => {
    render(<Logo />);

    const link = screen.getByRole('link', { name: 'Taverns & Notes' });

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', '/');
  });
});
