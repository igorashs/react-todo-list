import {
  Button,
  List,
  ListItem,
  Typography,
  Grid,
  Box,
  Paper,
  Container,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTodoStore } from './TodoContext';
import Header from './Header';
import NewTodoForm from './NewTodoForm';

const App = observer(() => {
  const { todos, toggleCompleted, removeTodo } = useTodoStore();

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Grid container direction="column">
          <Grid item>
            <List>
              {!todos.length ? (
                <Typography>Todo List is empty</Typography>
              ) : (
                todos.map((todo) => (
                  <ListItem
                    key={todo.id}
                    button
                    onClick={() => toggleCompleted(todo.id)}
                  >
                    <Container disableGutters>
                      <Paper>
                        <Box p={2}>
                          <Typography
                            style={{
                              textDecoration: todo.isCompleted
                                ? 'line-through'
                                : 'none',
                              wordBreak: 'break-all',
                            }}
                          >
                            {todo.text}
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeTodo(todo.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </Box>
                      </Paper>
                    </Container>
                  </ListItem>
                ))
              )}
            </List>
            <NewTodoForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default App;
