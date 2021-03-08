import { observer } from 'mobx-react-lite';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@material-ui/core';
import { useTodoStore } from './TodoContext';

const TodoList = observer(() => {
  const { todos, removeTodo, toggleCompleted } = useTodoStore();

  return (
    <List>
      {!todos.length ? (
        <Typography>Todo List is empty</Typography>
      ) : (
        todos.map((todo) => (
          <ListItem
            data-testid="todo-item"
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
                    data-testid="todo-delete-item"
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
  );
});

export default TodoList;
