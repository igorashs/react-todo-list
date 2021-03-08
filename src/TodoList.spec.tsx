import { render, cleanup, fireEvent } from '@testing-library/react';
import { TodoProvider, TodoContext } from './TodoContext';
import TodoList from './TodoList';

afterEach(cleanup);

describe('TodoList', () => {
  describe('when the initial list is empty', () => {
    it('renders the list is empty message', () => {
      const { getByText } = render(
        <TodoProvider>
          <TodoList />
        </TodoProvider>,
      );

      expect(getByText('Todo List is empty')).toBeTruthy();
    });
  });

  describe('when the list has elements', () => {
    it('renders the elements', () => {
      const { getByText } = render(
        <TodoProvider>
          <TodoList />
          <TodoContext.Consumer>
            {({ addTodo }) => (
              <button type="button" onClick={() => addTodo('Write Test')}>
                add
              </button>
            )}
          </TodoContext.Consumer>
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));

      expect(getByText('Write Test')).toBeTruthy();
    });
  });

  describe('.onTodoClick', () => {
    it('toggles completed style', () => {
      const { getByText, getByTestId } = render(
        <TodoProvider>
          <TodoList />
          <TodoContext.Consumer>
            {({ addTodo }) => (
              <button type="button" onClick={() => addTodo('Write Test')}>
                add
              </button>
            )}
          </TodoContext.Consumer>
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));
      fireEvent.click(getByTestId('todo-item'));

      expect(
        window.getComputedStyle(getByText('Write Test')).textDecoration,
      ).toBe('line-through');

      fireEvent.click(getByTestId('todo-item'));

      expect(
        window.getComputedStyle(getByText('Write Test')).textDecoration,
      ).toBe('none');
    });
  });

  describe('.onDeleteClick', () => {
    it('deletes todo from the list', () => {
      const { getByText, getByTestId, queryByText } = render(
        <TodoProvider>
          <TodoList />
          <TodoContext.Consumer>
            {({ addTodo }) => (
              <button type="button" onClick={() => addTodo('Write Test')}>
                add
              </button>
            )}
          </TodoContext.Consumer>
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));
      fireEvent.click(getByTestId('todo-delete-item'));

      expect(queryByText('Write Test')).toBeFalsy();
    });
  });
});
