import { render } from '@testing-library/react';
import App from './App';

jest.mock('./Header', () => () => <div>Header</div>);
jest.mock('./TodoList', () => () => <div>TodoList</div>);
jest.mock('./NewTodoForm', () => () => <div>TodoForm</div>);

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('TodoList')).toBeTruthy();
    expect(getByText('TodoForm')).toBeTruthy();
  });
});
