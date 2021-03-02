import {
  Button,
  List,
  ListItem,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
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
              {todos.map((todo) => (
                <ListItem
                  key={todo.id}
                  disableGutters
                  button
                  onClick={() => toggleCompleted(todo.id)}
                >
                  <Grid container justify="space-between">
                    <Typography
                      style={{
                        textDecoration: todo.isCompleted
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {todo.text}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeTodo(todo.id)}
                    >
                      remove
                    </Button>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <NewTodoForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default App;
