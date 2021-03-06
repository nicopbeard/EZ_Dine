import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import {Loader, Menu, Segment} from "semantic-ui-react";

export default withAuth(
  class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null, user: null, loading: true };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.getCurrentUser = this.getCurrentUser.bind(this);
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated }, () => this.getCurrentUser());
      }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    async getCurrentUser() {
      this.props.auth.getUser().then((user) => {
        console.log(user)
        this.setState({ user });
        this.setState({loading: false})
      });
    }

    render() {
        const authNav = this.state.authenticated ? (
            <React.Fragment>
              <Menu.Item as={Link} to='/profile' name='profile' />
              {!this.state.user ?
                  null
                  :
                  (<React.Fragment>
                      {this.state.user.userType === 'Customer' ? (
                        // Customer navigation
                        <React.Fragment>
                          <Menu.Item as={Link} to='/menu' name='menu' />
                          <Menu.Item as={Link} to='/order' name='order' />
                        </React.Fragment>
                    ) : (
                        // employee navigation
                        <React.Fragment>
                          <Menu.Item as={Link} to='/serverView' name='Current Orders'/>
                        </React.Fragment>)}
                      </React.Fragment>
                        )
              }
              <Menu.Item onClick={() => this.props.auth.logout()} name='Sign out' />
            </React.Fragment>
        ) : (
            <React.Fragment>
              <Menu.Item as={Link} to='/register' name='Register' />
              <Menu.Item onClick={() => this.props.auth.login()} name='Sign in' />
            </React.Fragment>
        );
        return (
            <Segment inverted color='blue' style={{ borderRadius: 0 }}>
              <Menu pointing secondary inverted>
                <Menu.Item
                    as={Link} to='/'
                    name='home'
                />
                {authNav}
              </Menu>
            </Segment>
        );
      }
  }
);
