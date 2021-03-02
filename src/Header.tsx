import {
  AppBar,
  Toolbar,
  Typography,
  Fab,
  makeStyles,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },

  fabLink: {
    boxShadow: 'none',
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          TodoList
        </Typography>
        <Fab
          className={classes.fabLink}
          href="https://github.com/igorashs/react-todo-list"
          target="_blank"
          rel="noreferrer"
          size="small"
        >
          <GitHubIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
