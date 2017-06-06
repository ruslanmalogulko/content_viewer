require('../styles/base.scss');

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { invalidateData, fetchDataIfNeeded } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {const { dispatch, params: {menu, tab} } = this.props;
    dispatch(fetchDataIfNeeded(menu, tab));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, params: {menu, tab} } = this.props;
    dispatch(fetchDataIfNeeded(menu, tab));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(invalidateData());
    dispatch(fetchDataIfNeeded());
  }

  render() {
    const { data, isFetching, lastUpdated } = this.props;
    return (
      <div>
        {isFetching && !Object.keys(data).length &&
          <h2>Loading...</h2>
        }
        {!isFetching && !Object.keys(data).length &&
          <h2>There is no content to show.</h2>
        }
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { content } = state;
  const {
    isFetching,
    lastUpdated,
    data
  } = content || {
    isFetching: true,
    data: {}
  };

  return {
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
