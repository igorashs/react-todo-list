import { Grid, Container } from '@material-ui/core';

import Header from './Header';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';

const App = () => {
  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Grid container direction="column">
          <Grid item>
            <TodoList />
            <NewTodoForm />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
