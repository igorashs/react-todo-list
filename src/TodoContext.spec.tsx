import { fireEvent, render } from '@testing-library/react';
import { observer } from 'mobx-react-lite';
import { TodoProvider, TodoContext, useTodoStore } from './TodoContext';

describe('TodoContext', () => {
  it('has empty initial todos', () => {
    const { getByText } = render(
      <TodoProvider>
        <TodoContext.Consumer>
          {({ todos }) =>
            !todos.length ? (
              <span>Todo List is empty</span>
            ) : (
              <span>Todo List is not empty</span>
            )
          }
        </TodoContext.Consumer>
      </TodoProvider>,
    );

    expect(getByText('Todo List is empty')).toBeTruthy();
  });

  describe('.addTodo', () => {
    it('adds new todo', async () => {
      const Todos = observer(() => {
        const { addTodo, todos } = useTodoStore();

        return (
          <>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>

            <button type="button" onClick={() => addTodo('Write Test')}>
              add
            </button>
          </>
        );
      });

      const { getByText, queryByText } = render(
        <TodoProvider>
          <Todos />
        </TodoProvider>,
      );

      expect(queryByText('Write Test')).toBeFalsy();
      fireEvent.click(getByText('add'));
      expect(getByText('Write Test')).toBeTruthy();
    });

    it('has false default value on isCompleted', () => {
      const Todos = observer(() => {
        const { addTodo, todos } = useTodoStore();

        return (
          <>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <span>
                    {todo.isCompleted ? 'completed' : 'not completed'}
                  </span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => addTodo('Write Test')}>
              add
            </button>
          </>
        );
      });

      const { getByText } = render(
        <TodoProvider>
          <Todos />
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));
      expect(getByText('not completed')).toBeTruthy();
    });
  });

  describe('.removeTodo', () => {
    it('removes a todo', () => {
      const Todos = observer(() => {
        const { addTodo, removeTodo, todos } = useTodoStore();

        return (
          <>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <span>{todo.text}</span>
                  <button type="button" onClick={() => removeTodo(todo.id)}>
                    remove
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => addTodo('Write Test')}>
              add
            </button>
          </>
        );
      });

      const { getByText, queryByText } = render(
        <TodoProvider>
          <Todos />
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));
      fireEvent.click(getByText('remove'));

      expect(queryByText('Write Test')).toBeFalsy();
    });
  });

  describe('.toggleCompleted', () => {
    it('toggles completed on todo', () => {
      const Todos = observer(() => {
        const { addTodo, toggleCompleted, todos } = useTodoStore();

        return (
          <>
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <button
                    type="button"
                    onClick={() => toggleCompleted(todo.id)}
                  >
                    {todo.text}
                  </button>
                  <span>
                    {todo.isCompleted ? 'completed' : 'not completed'}
                  </span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => addTodo('Write Test')}>
              add
            </button>
          </>
        );
      });

      const { getByText } = render(
        <TodoProvider>
          <Todos />
        </TodoProvider>,
      );

      fireEvent.click(getByText('add'));
      fireEvent.click(getByText('Write Test'));
      expect(getByText('completed')).toBeTruthy();
    });
  });
});
