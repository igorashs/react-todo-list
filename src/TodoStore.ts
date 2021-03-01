import { nanoid } from 'nanoid';

interface Todo {
  text: string;
  id: string;
}

export default class TodoStore {
  todos: Array<Todo> = [];

  addTodo(text: string) {
    this.todos.push({ text, id: nanoid() });
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}
