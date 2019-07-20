import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import api from '../../lib/api';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  && {
    margin-left: 15px;
  }
`;

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

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = ({ side, classes, onClick }) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key="Patients">
          <Link to="/patients">Patients</Link>
        </ListItem>

        <ListItem button key="PatientList">
          <Link to="/patientList">Patient List</Link>
        </ListItem>

        <ListItem button key="Users">
          <ListItemText primary="Users" />>
        </ListItem>
        <ListItem button key="Logout">
          <Button
            varient="contained"
            color="primary"
            className={classes.button}
            onClick={onClick}
          >
            Logout
          </Button>
        </ListItem>
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

          <div>
            <StyledLink to="/login" onClick={toggleDrawer('left', false)}>
              {'Login'}
            </StyledLink>

            <StyledLink to="/signup" onClick={toggleDrawer('left', false)}>
              {'Sign up'}
            </StyledLink>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList({
          side: 'left',
          classes,
          onClick: e => handleLogout(e, props)
        })}
      </Drawer>
    </div>
  );
};

async function handleLogout(e, props) {
  e.preventDefault();

  try {
    await api.logout();
    props.onClick();
  } catch (err) {}
}

export default NavBar;
