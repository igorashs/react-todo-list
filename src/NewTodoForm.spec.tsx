import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { observer } from 'mobx-react-lite';
import NewTodoForm from './NewTodoForm';
import { TodoProvider, useTodoStore } from './TodoContext';

afterEach(cleanup);

const renderWithStore = () =>
  render(
    <TodoProvider>
      <NewTodoForm />
    </TodoProvider>,
  );

describe('NewTodoForm', () => {
  it('renders add btn', () => {
    const { getByTestId } = renderWithStore();

    expect(getByTestId('open-btn')).toBeInTheDocument();
  });

  describe('.onOpenDialogClick', () => {
    it('renders the Dialog', () => {
      const { getByTestId } = renderWithStore();

      fireEvent.click(getByTestId('open-btn'));

      expect(getByTestId('text-input')).toBeInTheDocument();
      expect(getByTestId('close-btn')).toBeInTheDocument();
      expect(getByTestId('add-btn')).toBeInTheDocument();
    });
  });

  describe('Dialog', () => {
    describe('.onChangeTextInput', () => {
      it('shows current value', () => {
        const { getByTestId } = renderWithStore();

        fireEvent.click(getByTestId('open-btn'));
        const textInput = getByTestId('text-input') as HTMLInputElement;
        fireEvent.change(textInput, { target: { value: 'Write Test' } });

        expect(textInput.value).toBe('Write Test');
      });
    });

    describe('.onCloseDialogClick', () => {
      it('clears the form', () => {
        const { getByTestId } = renderWithStore();

        fireEvent.click(getByTestId('open-btn'));
        const textInput = getByTestId('text-input') as HTMLInputElement;
        fireEvent.change(textInput, { target: { value: 'Write Test' } });
        fireEvent.click(getByTestId('close-btn'));

        expect(textInput.value).toBe('');
      });

      it('closes the dialog', async () => {
        const { getByTestId, queryByTestId } = renderWithStore();

        fireEvent.click(getByTestId('open-btn'));
        fireEvent.click(getByTestId('close-btn'));

        await waitForElementToBeRemoved(() => getByTestId('text-input'));
        expect(queryByTestId('text-input')).not.toBeInTheDocument();
      });
    });

    describe('.onAddTodoClick', () => {
      it('clears the form', () => {
        const { getByTestId } = renderWithStore();

        fireEvent.click(getByTestId('open-btn'));
        const textInput = getByTestId('text-input') as HTMLInputElement;
        fireEvent.change(textInput, { target: { value: 'Write Test' } });
        fireEvent.click(getByTestId('add-btn'));

        expect(textInput.value).toBe('');
      });

      it('closes the dialog', async () => {
        const { getByTestId, queryByTestId } = renderWithStore();

        fireEvent.click(getByTestId('open-btn'));
        fireEvent.click(await getByTestId('add-btn'));

        await waitForElementToBeRemoved(() => getByTestId('text-input'));
        expect(queryByTestId('text-input')).not.toBeInTheDocument();
      });

      it('adds new todo', () => {
        const TodoList = observer(() => {
          const { todos } = useTodoStore();

          return (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
            </ul>
          );
        });

        const { getByTestId, getByText } = render(
          <TodoProvider>
            <>
              <TodoList />
              <NewTodoForm />
            </>
          </TodoProvider>,
        );

        fireEvent.click(getByTestId('open-btn'));
        const textInput = getByTestId('text-input') as HTMLInputElement;
        fireEvent.change(textInput, { target: { value: 'Write Test' } });
        fireEvent.click(getByTestId('add-btn'));

        expect(getByText('Write Test')).toBeTruthy();
      });
    });
  });
});
