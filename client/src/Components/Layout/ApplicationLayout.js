import React from 'react';
// import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import NavBar from './NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const styles = {
  container: {
    flexGrow: 1
  }
};

// const classes = useStyles();  ??

export default class ApplicationLayout extends React.Component {
  render() {
    const { history, children } = this.props;

    return (
      <div style={styles.container}>
        <Grid container direction="column">
          <Grid item lg="auto">
            <NavBar history={history} />
          </Grid>
          <Grid item xs="auto">
            {children}
          </Grid>
        </Grid>
      </div>
    );
  }

  //   async function handleLogout() {
  //     this.Auth.logout();

  //     this.props.history.replace('/login');
  //   }
}

// export default withAuth(ApplicationLayout);
