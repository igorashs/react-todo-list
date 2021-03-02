import { Grid, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import { useTodoStore } from './TodoContext';

const NewTodoForm = () => {
  const { addTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  return (
    <Grid container direction="column">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (newTodo) {
            addTodo(newTodo);
            setNewTodo('');
          }
        }}
      >
        <TextField
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="outlined" color="primary" type="submit">
          Add
        </Button>
      </form>
    </Grid>
  );
};

export default NewTodoForm;
