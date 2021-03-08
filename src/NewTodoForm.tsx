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
    <>
      <Grid container direction="column">
        <Box display="flex" justifyContent="flex-end" px={2}>
          <Button
            data-testid="open-btn"
            variant="contained"
            color="primary"
            type="button"
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Button>
        </Box>
      </Grid>

      <Dialog open={open} onClose={() => handleClose()} fullWidth>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            inputProps={{ 'data-testid': 'text-input' }}
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
            data-testid="close-btn"
            color="secondary"
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            cancel
          </Button>
          <Button
            data-testid="add-btn"
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
    </>
  );
};

export default NewTodoForm;
