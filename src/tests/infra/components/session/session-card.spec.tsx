import {
  SessionCard,
  SessionCardProps,
} from '@/components/session/session-card';
import { render, screen } from '@/lib/test-utils';

const renderSut = ({ session }: SessionCardProps) => {
  return render(<SessionCard session={session} />);
};

describe('SessionCard', () => {
  const session = { id: '1', title: 'title 01', note: 'content 01' };

  it('deveria renderizar o link com href corretamente', () => {
    renderSut({ session });
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/${session.id}`);
  });
});
