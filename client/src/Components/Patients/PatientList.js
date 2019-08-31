import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, Button } from '@material-ui/core';

// Adding avatar
import Avatar from '@material-ui/core/Avatar';
import teal from '@material-ui/core/colors/teal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'flex',
    flexDirection: 'row',
    overflow: 'auto',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    }
  },
  listSection: {
    backgroundColor: 'inherit'
  },

  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: teal[300],
    width: 100,
    height: 100,
    fontSize: 40,
    textTranform: 'uppercase'
  },
  info: {
    fontSize: 20
  }
}));

export default function PatientList(props) {
  const classes = useStyles();
  const { _id, firstName, lastName, email, dob, phone } = props.data;

  return (
    <ListItem className={classes.root} onClick={handleClick}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Avatar className={classes.avatar}>
            {`${lastName.charAt(0)}${firstName.charAt(0)}`}
          </Avatar>
          <div className={classes.info}>
            <div style={{ fontWeight: 600 }}>{`${lastName}, ${firstName}`}</div>
            <div>{`${email}`}</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, fontSize: 20, textAlign: 'center' }}>{phone}</div>
    </ListItem>
  );

  function handleClick() {
    props.onClick(_id);
  }
}
