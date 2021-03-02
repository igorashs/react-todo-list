import React, { createContext, useContext } from 'react';
import TodoStore from './TodoStore';

const TodoContext = createContext<TodoStore>({} as TodoStore);

type Props = {
  children: React.ReactNode;
};

const TodoProvider = ({ children }: Props) => {
  return (
    <TodoContext.Provider value={new TodoStore()}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoStore = () => useContext(TodoContext);

export default TodoProvider;
