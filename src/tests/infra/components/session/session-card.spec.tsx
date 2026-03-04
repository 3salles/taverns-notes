import {
  SessionCard,
  SessionCardProps,
} from '@/components/session/session-card';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

const renderSut = ({ session }: SessionCardProps) => {
  return render(<SessionCard session={session} />);
};

describe('SessionCard', () => {
  const user = userEvent.setup();
  const session = { id: '1', title: 'title 01', note: 'content 01' };

  it('deveria renderizar o link com href corretamente', () => {
    renderSut({ session });
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/${session.id}`);
  });

  it('should open dialog to delete session', async () => {
    renderSut({ session });

    const deleteButton = screen.getByRole('button', { name: 'Remover sessão' });

    await user.click(deleteButton);

    expect(screen.getByText('Remover Sessão')).toBeInTheDocument();
  });
});
