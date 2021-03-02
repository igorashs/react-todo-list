import {
  Grid,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useTodoStore } from './TodoContext';

const NewTodoForm = () => {
  const { addTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setNewTodo('');
  };

  return (
    <Grid container direction="column">
      <Box
        display="flex"
        justifyContent="flex-end"
        px={2}
        onSubmit={(e) => {
          e.preventDefault();

          if (newTodo) {
            addTodo(newTodo);
            setNewTodo('');
          }
        }}
      >
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Button>

        <Dialog open={open} onClose={() => handleClose()} fullWidth>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Note"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              type="button"
              onClick={() => {
                handleClose();
              }}
            >
              cancel
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => {
                addTodo(newTodo);
                handleClose();
              }}
            >
              add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Grid>
  );
};

export default NewTodoForm;
