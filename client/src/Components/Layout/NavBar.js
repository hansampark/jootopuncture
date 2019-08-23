import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  CircularProgress
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import api from '../../lib/api';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  list: {
    [theme.breakpoints.down('xs')]: {
      width: 200
    },
    [theme.breakpoints.up('sm')]: {
      width: 250
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(30),
    marginBottom: theme.spacing(5),
    width: 100
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = ({ side }) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key="Schedule">
          <Link className={classes.link} to="/">
            {'Schedule'}
          </Link>
        </ListItem>

        <ListItem button key="Create">
          <Link className={classes.link} to="/create-patient">
            {'Create Patient'}
          </Link>
        </ListItem>

        <ListItem button key="Patients">
          <Link className={classes.link} to="/patients">
            {'Patients'}
          </Link>
        </ListItem>

        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={classes.button}
            onClick={handleLogout}
          >
            {loading ? (
              <CircularProgress
                style={{ width: 24, height: 24 }}
                className={classes.progress}
              />
            ) : (
              'Logout'
            )}
          </Button>
        </div>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer('left', true)}
            color="inherit"
            aria-label="Open drawer"
          >
            <Menu />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            {'Jootopuncture'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={state.left}
        classes={{ paper: classes.drawer }}
        onClose={toggleDrawer('left', false)}
      >
        {sideList({
          side: 'left'
        })}
      </Drawer>
    </div>
  );

  async function handleLogout(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await api.logout();
      setLoading(false);
      props.history.push('/login');
    } catch (err) {
      setLoading(false);
      setErrors(err);
    }
  }
};

export default NavBar;
