import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withSession } from '../../reducers/session';
import NavBar from './NavBar';
import SessionExpiredModal from '../Auth/SessionExpiredModal';

const SessionStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
  REDIRECT: 'REDIRECT'
};

const styles = {
  container: {
    flexGrow: 1
  }
};

class ApplicationLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionStatus: SessionStatus.ACTIVE
    };
  }
  render() {
    const { sessionStatus } = this.state;
    const { history, children } = this.props;

    return (
      <div style={styles.container}>
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ width: '100%' }}
          >
            <NavBar history={history} />
          </Grid>
          <Grid item xs="auto">
            {children}
          </Grid>
        </Grid>

        {sessionStatus === SessionStatus.EXPIRED && (
          <SessionExpiredModal open history={history} />
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.session &&
      this.props.session &&
      prevProps.session.isExpired !== this.props.session.isExpired &&
      this.props.session.isExpired === true
    ) {
      this.setState({
        sessionStatus: SessionStatus.EXPIRED
      });
    }
  }
}

export default connect(withSession)(ApplicationLayout);
