import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { purgeStorage } from '../../actions';

const useStyles = makeStyles(theme => ({
  content: {
    textAlign: 'center'
  },
  buttonWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    justifyContent: 'center'
  },
  button: {
    width: 120
  },
  progress: {
    color: '#ffffff'
  }
}));

export default function SessionExpiredModal(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="session-expired-modal"
      aria-describedby="session-expired-modal"
      fullWidth
    >
      <DialogTitle id="session-expired-modal-title" className={classes.content}>
        {'Your session has expired'}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {'Please log in ot access Jootopuncture'}
      </DialogContent>
      <DialogActions className={classes.buttonWrapper}>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          autoFocus
        >
          {'ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const { history } = props;

    dispatch(purgeStorage());
    history.push('/login');
  }
}
