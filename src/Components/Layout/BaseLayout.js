import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const theme = {};

class BaseLayout extends React.Component {
  static childContextTypes = {
    theme: PropTypes.objectOf
  };
  getChildContext() {
    return {
      theme
    };
  }

  render() {
    console.log('[theme]', theme);
    return this.props.children;
  }

  componentDidMount() {
    const { history, location } = this.props;

    // window.ga('send', 'pageview', location.pathname);

    // history.listen(location => {
    //   window.ga('send', 'pageview', location.pathname);
    // });
  }
}

export default withRouter(BaseLayout);
