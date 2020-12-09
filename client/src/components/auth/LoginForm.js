import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import {Button, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";

export default withAuth(
    class LoginForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          sessionToken: null,
          error: null,
          username: '',
          password: ''
        };

        this.oktaAuth = new OktaAuth({ url: props.baseUrl });

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
      }

      handleSubmit(e) {
        e.preventDefault();
        this.oktaAuth
            .signIn({
              username: this.state.username,
              password: this.state.password
            })
            .then(res => {
              console.log(res);
                  this.setState({
                    sessionToken: res.sessionToken
                  })
                }
            )
            .catch(err => {
              this.setState({ error: err.message });
              console.log(err.statusCode + ' error', err);
            });
      }

      handleUsernameChange(e) {
        this.setState({ username: e.target.value });
      }

      handlePasswordChange(e) {
        this.setState({ password: e.target.value });
      }

      render() {
        if (this.state.sessionToken) {
          this.props.auth.redirect({ sessionToken: this.state.sessionToken });
          return null;
        }

        const errorMessage = this.state.error ? (
            <span className="error-message">{this.state.error}</span>
        ) : null;

        return (
            <Grid className='form-backsplash'>
              <Grid.Column className='form-wrapper' mobile={14} tablet={10} computer={6}>
                <Segment raised style={{padding: 26}}>
                  <Header as='h3' icon textAlign='center'>
                    <Icon name='sign in' color='grey' circular />
                    <Header.Content>Sign In</Header.Content>
                  </Header>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                      <Input
                          type="email"
                          id="email"
                          value={this.state.username}
                          onChange={this.handleUsernameChange}
                          icon='at'
                          iconPosition='left'
                          placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                      <Input
                          type="password"
                          id="password"
                          value={this.state.password}
                          onChange={this.handlePasswordChange}
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password' />
                    </Form.Field>
                    <Button type="submit" id="submit" primary icon labelPosition='right'>
                      Sign In
                      <Icon name='sign in'/>
                    </Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid>
        );
      }
    }
);
