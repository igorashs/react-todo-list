import TodoStore from './TodoStore';

describe('TodoStore', () => {
  it('has empty initial todos', () => {
    const todoStore = new TodoStore();

    expect(todoStore.todos.length).toBeFalsy();
  });

  describe('.addTodo', () => {
    it('adds a new todo', () => {
      const todoStore = new TodoStore();
      todoStore.addTodo('Write Test');

      expect(todoStore.todos[0].text).toBe('Write Test');
    });

    it('has false default value on isCompleted', () => {
      const todoStore = new TodoStore();
      todoStore.addTodo('Write Test');

      expect(!todoStore.todos[0].isCompleted).toBeTruthy();
    });
  });

  describe('.removeTodo', () => {
    it('removes a todo', () => {
      const todoStore = new TodoStore();
      todoStore.addTodo('Write Test');
      todoStore.removeTodo(todoStore.todos[0].id);

      expect(todoStore.todos.length).toBeFalsy();
    });
  });

  describe('.toggleCompleted', () => {
    it('toggles completed on todo', () => {
      const todoStore = new TodoStore();
      todoStore.addTodo('Write Test');
      const { id } = todoStore.todos[0];

      todoStore.toggleCompleted(id);
      expect(todoStore.todos[0].isCompleted).toBeTruthy();

      todoStore.toggleCompleted(id);
      expect(todoStore.todos[0].isCompleted).toBeFalsy();
    });
  });
});
