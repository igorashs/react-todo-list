import React, { createContext, useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import TodoStore from './TodoStore';

const TodoContext = createContext<TodoStore>({} as TodoStore);

type Props = {
  children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
  const todoStore = makeAutoObservable(new TodoStore());

  return (
    <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>
  );
};

export const useTodoStore = () => useContext(TodoContext);

export default TodoProvider;
