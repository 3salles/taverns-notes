import { SessionForm } from '@/components/session';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const refreshMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const createActionMock = jest.fn();
jest.mock('@/app/actions/session.actions', () => ({
  createSessionAction: (...args: unknown[]) => createActionMock(...args),
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const renderSut = () => {
  return render(<SessionForm />);
};

describe('SessionForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    createActionMock.mockReset();
    refreshMock.mockReset();
    (toast.success as jest.Mock).mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('should create a session successfully', async () => {
    const successMessage = 'Sessão criada com sucesso!';
    createActionMock.mockResolvedValueOnce({
      success: true,
      message: successMessage,
    });
    renderSut();

    const titleInput = screen.getByPlaceholderText('Título da sessão');
    await user.type(titleInput, 'Title');
    const noteInput = screen.getByPlaceholderText(
      'Digite o conteúdo da sessão...'
    );
    await user.type(noteInput, 'Content');

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(createActionMock).toHaveBeenCalledWith({
      title: 'Title',
      note: 'Content',
    });
    expect(toast.success).toHaveBeenCalledWith(successMessage);
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it('should show toast error when session creation has error', async () => {
    const errorMessage = 'Falha ao criar sessão';
    createActionMock.mockResolvedValueOnce({
      success: false,
      message: errorMessage,
    });
    renderSut();

    const titleInput = screen.getByPlaceholderText('Título da sessão');
    await user.type(titleInput, 'Title');
    const noteInput = screen.getByPlaceholderText(
      'Digite o conteúdo da sessão...'
    );
    await user.type(noteInput, 'Content');

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(toast.error).toHaveBeenCalledWith(errorMessage);
    expect(refreshMock).not.toHaveBeenCalledTimes(1);
  });

  it('should show error message when try save empty form', async () => {
    renderSut();

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    await user.click(submitButton);

    expect(screen.getByText('Título é obrigatório')).toBeVisible();
    expect(screen.getByText('Conteúdo é obrigatório')).toBeVisible();
    expect(createActionMock).not.toHaveBeenCalled();
  });
});
