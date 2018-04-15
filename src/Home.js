import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import OktaAuthButton from './OktaAuthButton';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <OktaAuthButton />
        <button onClick={this.props.go}>Test Location</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // todo: state.todos[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    go: () => dispatch(push('/protected'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
