// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
// import { Grid } from '@material-ui/core';

// const theme = createMuiTheme({
//   root: {}
// });

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   }
// }));

// function BaseLayout(props) {
//   console.log('[localStorage]', localStorage);
//   const classes = useStyles();
//   return props.children;
//   // <div className={classes.root}>
//   //   <Grid
//   //     container
//   //     alignContent={'center'}
//   //     alignItems={'center'}
//   //     justify={'center'}
//   //     direction={'column'}
//   //     wrap={'nowrap'}
//   //   >
//   //     {props.children}
//   //   </Grid>
//   // </div>
// }

// export default withRouter(BaseLayout);

import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import api from '../../lib/api';

const theme = {};

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage.id_token || null,
      redirect: false
    };
  }

  render() {
    const { token, redirect } = this.state;

    // if (redirect) {
    //   return (
    //     <Redirect
    //       to={{ pathname: '/login', state: { from: this.props.location } }}
    //     />
    //   );
    // }
    return this.props.children;
  }

  // async componentDidMount() {
  //   const token = await api.getToken();
  //   console.log('[token]', token, !token);

  //   if (!!token) {
  //     this.setState({
  //       token
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.token !== prevState.token && !this.state.token) {
  //     console.log('[redirect]');
  //     this.setState({
  //       redirect: true
  //     });
  //   }
  // }

  //  componentDidMount() {
  //    const { history, location } = this.props;

  //     // window.ga('send', 'pageview', location.pathname);

  //     // history.listen(location => {
  //     //   window.ga('send', 'pageview', location.pathname);
  //     // });
  //   }
}

export default withRouter(BaseLayout);
