import { nanoid } from 'nanoid';
import { makeAutoObservable } from 'mobx';

interface Todo {
  text: string;
  id: string;
  isCompleted: boolean;
}

export default class TodoStore {
  todos: Array<Todo> = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (text: string) => {
    this.todos.push({ text, id: nanoid(), isCompleted: false });
  };

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((t) => t.id !== id);
  };

  toggleCompleted = (id: string) => {
    this.todos = this.todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
    );
  };
}
