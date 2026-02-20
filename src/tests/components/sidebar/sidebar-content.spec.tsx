import {
  SidebarContent,
  SidebarContentProps,
} from '@/components/sidebar/sidebar-content';
import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

const pushMock = jest.fn();
let mockSearchParams = new URLSearchParams();
let user: ReturnType<typeof userEvent.setup>;

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => mockSearchParams,
}));

const sessionsMock = [
  {
    id: '1',
    title: 'Title 01',
    note: 'Content 01',
  },
];

const renderSut = (
  { sessions = sessionsMock }: SidebarContentProps = {} as SidebarContentProps
) => render(<SidebarContent sessions={sessions} />);

describe('SidebarContent', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  const user = userEvent.setup();

  describe('base', () => {
    it("should render the sidebar and the 'Nova Sessão' button", () => {
      // Given
      renderSut();

      // Then
      expect(screen.getByRole('complementary')).toBeVisible();
      expect(
        screen.getByRole('button', { name: /nova sessão/i })
      ).toBeVisible();
    });

    it('should list sessions', () => {
      // Given
      const sessionsListMock = [
        {
          id: '1',
          title: 'Title 01',
          note: 'Content 01',
        },
        {
          id: '2',
          title: 'Title 02',
          note: 'Content 02',
        },
      ];

      renderSut({ sessions: sessionsListMock });

      // Then
      expect(screen.getByText(sessionsListMock[0].title)).toBeInTheDocument();
      expect(screen.getAllByRole('paragraph')).toHaveLength(
        sessionsListMock.length
      );
    });

    it('should update search input when typing', async () => {
      // Given
      const text = 'Hey';
      renderSut();
      const searchInput = screen.getByPlaceholderText('Buscar sessões...');

      // When
      await user.type(searchInput, text);

      // Then
      expect(searchInput).toHaveValue(text);
    });
  });

  describe('Collapse and expand', () => {
    it('should start expanded and show the minimize button', () => {
      // Given
      renderSut();

      // Then
      expect(screen.getByRole('complementary')).toBeVisible();

      expect(
        screen.getByRole('button', { name: /minimizar sidebar/i })
      ).toBeVisible();

      expect(
        screen.queryByRole('button', { name: /expandir sidebar/i })
      ).not.toBeInTheDocument();
    });

    it('should expand sidebar when it is collapsed when click the expand button', async () => {
      renderSut();
      const collapsedButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(collapsedButton);

      const expandButton = screen.getByRole('button', {
        name: /expandir sidebar/i,
      });

      await user.click(expandButton);

      expect(
        screen.getByRole('button', {
          name: /minimizar sidebar/i,
        })
      ).toBeVisible();
      expect(
        screen.getByRole('navigation', {
          name: /lista de sessões/i,
        })
      ).toBeVisible();
    });

    it('should collapse the sidebar and show the expand button', async () => {
      // Given
      renderSut();

      // When
      await user.click(
        screen.getByRole('button', { name: /minimizar sidebar/i })
      );

      // Then
      expect(
        screen.getByRole('button', { name: /expandir sidebar/i })
      ).toBeVisible();

      expect(
        screen.queryByRole('button', { name: /minimizar sidebar/i })
      ).not.toBeInTheDocument();
    });

    it("should show 'Nova Sessão' button when sidebar is collapsed", async () => {
      // Given
      renderSut();

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      // When
      await user.click(collapseButton);

      // Then
      const newSessionButton = screen.getByRole('button', {
        name: /nova sessão/i,
      });
      expect(newSessionButton).toBeVisible();
    });

    it('should NOT show sessions list when sidebar is collapsed', async () => {
      // Given
      renderSut();

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      // When
      await user.click(collapseButton);

      // Then
      const nav = screen.queryByRole('navigation', {
        name: /lista de sessões/i,
      });
      expect(nav).not.toBeInTheDocument();
    });
  });

  describe('New session navigation', () => {
    it("should navigate to /new when the user clicks on 'Nova Sessão'", async () => {
      // Given
      const user = userEvent.setup();
      renderSut();

      // When
      await user.click(screen.getByRole('button', { name: /nova sessão/i }));

      // Then
      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });

  describe('Search', () => {
    it('should navigate with coded URL when typing and clearing input', async () => {
      // Given
      const text = 'A B';
      renderSut();
      const searchInput = screen.getByPlaceholderText('Buscar sessões...');

      // When
      await user.type(searchInput, text);

      // Then
      expect(pushMock).toHaveBeenCalled();
      const lastCall = pushMock.mock.calls.at(-1);
      expect(lastCall?.[0]).toBe('/?q=A%20B');

      // And When
      await user.clear(searchInput);

      // Then
      const lastClearCall = pushMock.mock.calls.at(-1);
      expect(lastClearCall?.[0]).toBe('/');
    });

    it('should submit form when user type in search input', async () => {
      const submitSpy = jest
        .spyOn(HTMLFormElement.prototype, 'requestSubmit')
        .mockImplementation(() => undefined);
      renderSut();

      const searchInput = screen.getByPlaceholderText('Buscar sessões...');

      await user.type(searchInput, '01');

      expect(submitSpy).toHaveBeenCalled();
      submitSpy.mockRestore();
    });

    it('should submit automatic on mount when there is query', async () => {
      const submitSpy = jest
        .spyOn(HTMLFormElement.prototype, 'requestSubmit')
        .mockImplementation(() => undefined);
      renderSut();

      const text = 'text';
      const searchParams = new URLSearchParams(`q=${text}`);
      mockSearchParams = searchParams;
      renderSut();

      expect(submitSpy).toHaveBeenCalled();
      submitSpy.mockRestore();
    });
  });

  it('should start search input with param', () => {
    //Given
    const text = 'inicial';
    const searchParams = new URLSearchParams(`q=${text}`);
    mockSearchParams = searchParams;
    renderSut();
    const searchInput = screen.getByPlaceholderText('Buscar sessões...');

    //Then
    expect(searchInput).toHaveValue(text);
  });
});
