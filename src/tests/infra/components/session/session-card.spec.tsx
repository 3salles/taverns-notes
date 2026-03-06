import {
  SessionCard,
  SessionCardProps,
} from '@/components/session/session-card';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const deleteMock = jest.fn();
jest.mock('@/app/actions/session.actions', () => ({
  deleteSessionAction: (id: string) => deleteMock(id),
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const renderSut = ({ session }: SessionCardProps) => {
  return render(<SessionCard session={session} />);
};

describe('SessionCard', () => {
  beforeEach(() => {
    deleteMock.mockReset();
    (toast.success as jest.Mock).mockReset();
    (toast.error as jest.Mock).mockReset();
  });

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

    const deleteButton = screen.getByRole('button', { name: 'Remover Sessão' });
    await user.click(deleteButton);

    expect(screen.getByText('Remover Sessão')).toBeInTheDocument();
  });

  it('should successfully remove session and show toast', async () => {
    deleteMock.mockResolvedValue({
      success: true,
      message: 'Sessão removida com sucesso!',
    });
    renderSut({ session });

    const deleteButton = screen.getByRole('button', { name: 'Remover Sessão' });
    await user.click(deleteButton);
    await user.click(screen.getByRole('button', { name: 'Remover' }));

    expect(toast.success).toHaveBeenCalledWith('Sessão removida com sucesso!');
  });

  it('should throw error when fails on remove session', async () => {
    const errorMessage = 'Falha ao remover sessão';
    deleteMock.mockResolvedValue({ success: false, message: errorMessage });

    renderSut({ session });

    const deleteButton = screen.getByRole('button', { name: 'Remover Sessão' });
    await user.click(deleteButton);
    await user.click(screen.getByRole('button', { name: 'Remover' }));

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
