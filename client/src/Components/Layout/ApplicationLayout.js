import React from 'react';
// import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
// import api from '../../lib/api';
// import { logout } from '../../actions';
import NavBar from './NavBar';
// import AuthHelperMethods from '../Auth/AuthHelperMethods';
// import withAuth from '../Auth/withAuth';

// const Auth = new AuthHelperMethods();

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
    const { children } = this.props;

    return (
      <div style={styles.container}>
        <Grid container direction="column">
          <Grid item lg="auto">
            <NavBar onClick={this.handleLogout} />
          </Grid>
          <Grid item xs="auto">
            {children}
          </Grid>
        </Grid>
      </div>
    );
  }

  handleLogout = async () => {
    const { history } = this.props;

    await history.push('/login');
  };

  //   async function handleLogout() {
  //     this.Auth.logout();

  //     this.props.history.replace('/login');
  //   }
}

// export default withAuth(ApplicationLayout);
