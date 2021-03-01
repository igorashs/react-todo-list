import {
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTodoStore } from './TodoContext';

const App = observer(() => {
  const todoStore = useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  return (
    <Box m={4}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <List>
            {todoStore.todos.map((todo) => (
              <ListItem key={todo.id} disableGutters>
                <Grid container justify="space-between">
                  <Typography>{todo.text}</Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => todoStore.removeTodo(todo.id)}
                  >
                    remove
                  </Button>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Grid container direction="column">
            <TextField
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                if (newTodo) {
                  todoStore.addTodo(newTodo);
                  setNewTodo('');
                }
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});

export default App;
