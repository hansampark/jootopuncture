import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

export default function SideMenu(props) {
  const classes = useStyles();
  console.log('[props]', props, props.open);
  const SideList = (
    <div
      className={classes.list}
      onClick={props.toggleSideMenu(false)}
      onKeyDown={props.toggleSideMenu(false)}
    >
      <List>
        <ListItem button key="Users">
          <ListItemText primary="Users" />>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.toggleSideMenu(false)}
    >
      {<SideList />}
    </Drawer>
  );
}
