import {
  createSessionAction,
  searchSessionAction,
  updateSessionAction,
} from '@/app/actions/session.actions';

jest.mock('@/lib/prisma', () => ({ prisma: {} }));
const mockedSearchExecute = jest.fn();
const mockedCreateExecute = jest.fn();
const mockedUpdateExecute = jest.fn();

jest.mock('@/core/application/session/search-session.use-case', () => ({
  SearchSessionUseCase: jest
    .fn()
    .mockImplementation(() => ({ execute: mockedSearchExecute })),
}));

jest.mock('@/core/application/session/create-session.use-case', () => ({
  CreateSessionUseCase: jest
    .fn()
    .mockImplementation(() => ({ execute: mockedCreateExecute })),
}));

jest.mock('@/core/application/session/update-session.use-case', () => ({
  UpdateSessionUseCase: jest
    .fn()
    .mockImplementation(() => ({ execute: mockedUpdateExecute })),
}));

describe('Server Actions: Sessions', () => {
  beforeEach(() => {
    mockedSearchExecute.mockReset();
    mockedCreateExecute.mockReset();
    mockedUpdateExecute.mockReset();
  });

  describe('searchSessionAction', () => {
    it('should return success with search result term not empty', async () => {
      const input = [{ id: '1', title: 'Sessão 01', note: 'Content' }];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();
      formData.append('q', '01');

      const result = await searchSessionAction({ success: true }, formData);
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });

    it('should return success and return all sessions when term is empty', async () => {
      const input = [
        { id: '1', title: 'First', note: 'Content 01' },
        { id: '2', title: 'Second', note: 'Content 02' },
      ];
      mockedSearchExecute.mockResolvedValue(input);
      const formData = new FormData();
      formData.append('q', '');

      const result = await searchSessionAction({ success: true }, formData);
      expect(result.success).toBeDefined();
      expect(result.sessions).toEqual(input);
    });

    it('should return generic error when search fails', async () => {
      const error = new Error('UNKNOWN');
      mockedSearchExecute.mockRejectedValue(error);

      const formData = new FormData();
      formData.append('q', 'error');

      const result = await searchSessionAction({ success: true }, formData);

      expect(result.success).toBe(false);
      expect(result.sessions).toBe(undefined);
      expect(result.message).toBe('Falha ao buscar sessões');
    });

    it('should treat the absence of a query as an empty term', async () => {
      const input = [
        { id: '1', title: 'First title', note: 'Content 01' },
        { id: '2', title: 'Second title', note: 'Content 02' },
      ];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();

      const result = await searchSessionAction({ success: true }, formData);

      expect(mockedSearchExecute).toHaveBeenCalledWith('');
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });

    it('should trim the spaces in the term before executing', async () => {
      const input = [{ id: '1', title: 'Sessão 01', note: 'Content' }];
      mockedSearchExecute.mockResolvedValue(input);

      const formData = new FormData();
      formData.append('q', '    Sessão 01   ');

      const result = await searchSessionAction({ success: true }, formData);

      expect(mockedSearchExecute).toHaveBeenCalledWith('Sessão 01');
      expect(result.success).toBe(true);
      expect(result.sessions).toEqual(input);
    });
  });

  describe('createSessionAction', () => {
    it('should return validation error when fields are empty', async () => {
      const data = {
        title: '',
        note: '',
      };

      const result = await createSessionAction(data);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe('Erro de validação');
      expect(result?.errors).toBeDefined();
    });

    it('should create session with success', async () => {
      mockedCreateExecute.mockResolvedValue(undefined);
      const data = {
        title: 'Sessão 01',
        note: 'Nota',
      };

      const result = await createSessionAction(data);

      expect(result?.success).toBe(true);
      expect(result?.message).toBe('Sessão criada com sucesso!');
    });

    it('should return error when creation fails', async () => {
      mockedCreateExecute.mockRejectedValue(new Error('UNKNOWN'));
      const data = {
        title: 'Sessão 01',
        note: 'Nota',
      };

      const result = await createSessionAction(data);

      expect(result?.success).toBe(false);
      expect(result?.message).toBe('Falha ao criar sessão');
    });
  });

  describe('updateSessionAction', () => {
    const sessionId = '1';
    const data = {
      id: sessionId,
      title: 'new title',
      note: 'new note',
    };

    it('should throw validation error when there is empty fields', async () => {
      const data = {
        id: '1',
        title: '',
        note: '',
      };

      const result = await updateSessionAction(data);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Erro de validação');
      expect(result.errors).toBeDefined();
    });

    it('should throw error when session does not exist', async () => {
      mockedUpdateExecute.mockRejectedValue(new Error('ERROR_NOT_FOUND'));

      const result = await updateSessionAction(data);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Sessão não encontrada');
    });

    it('should update successfully', async () => {
      mockedUpdateExecute.mockResolvedValue({});

      const result = await updateSessionAction(data);

      expect(result).toMatchObject({
        success: true,
        message: 'Sessão atualizada com sucesso!',
      });
    });

    it('should throw generic error when session update fails', async () => {
      mockedUpdateExecute.mockRejectedValue(new Error('UNKNOWN'));
      const result = await updateSessionAction(data);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Falha ao atualizar sessão');
    });
  });
});
