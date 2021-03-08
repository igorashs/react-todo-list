import { render, cleanup } from '@testing-library/react';
import Header from './Header';

afterEach(cleanup);

describe('Header', () => {
  it('renders the title', () => {
    const { getByText } = render(<Header />);

    expect(getByText('TodoList')).toBeInTheDocument();
  });
});
