import { SessionList, SessionListProps } from '@/components/session';
import { render, screen } from '@/lib/test-utils';

const makeSut = ({ sessions }: SessionListProps) => {
  return render(<SessionList sessions={sessions} />);
};

describe('SessionList', () => {
  it('should render list with sessions', () => {
    const sessions = [
      { id: '1', title: 'A', note: 'X' },
      { id: '2', title: 'B', note: 'Y' },
    ];
    makeSut({ sessions });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('should NOT render list without sessions', () => {
    const sessions = [] as SessionListProps['sessions'];
    makeSut({ sessions });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
