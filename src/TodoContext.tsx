import React, { createContext, useContext } from 'react';
import TodoStore from './TodoStore';

export const TodoContext = createContext<TodoStore>({} as TodoStore);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  return (
    <TodoContext.Provider value={new TodoStore()}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoStore = () => useContext(TodoContext);
