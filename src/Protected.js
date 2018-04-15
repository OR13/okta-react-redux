import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class Protected extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.logout = this.logout.bind(this);
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    async logout() {
      this.props.auth.logout('/');
    }

    render() {
      return (
        <div>
          <h1>Protected</h1>
          <button onClick={this.logout}>Logout</button>
        </div>
      );
    }
  }
);
