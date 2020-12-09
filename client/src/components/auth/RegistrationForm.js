import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import config from '../../app.config';
import {Button, Divider, Form, Grid, Header, Icon, Input, Label, Popup, Segment} from "semantic-ui-react";

const APPROVED_EMPLOYEE_CODE = 'iamanemployee';

export default withAuth(
    class RegistrationForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          sessionToken: null,
          employeeCode: '',
          shouldDisplayEmployeeCode: false
        };
        this.oktaAuth = new OktaAuth({ url: config.url });
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmployeeCodeChange = this.handleEmployeeCodeChange.bind(this);
        this.handleEmployeeCodeReveal = this.handleEmployeeCodeReveal.bind(this);
      }

      async checkAuthentication() {
        const sessionToken = await this.props.auth.getIdToken();
        if (sessionToken) {
          this.setState({ sessionToken });
        }
      }

      componentDidUpdate() {
        this.checkAuthentication();
      }

      handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
      }
      handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
      }
      handleEmailChange(e) {
        this.setState({ email: e.target.value });
      }
      handlePasswordChange(e) {
        this.setState({ password: e.target.value });
      }
      handleEmployeeCodeChange(e) {
        this.setState({ employeeCode: e.target.value });
      }

      handleEmployeeCodeReveal() {
        this.setState({shouldDisplayEmployeeCode: !this.state.shouldDisplayEmployeeCode});
      }

      handleSubmit(e) {
        e.preventDefault();

        if (this.state.employeeCode.toLowerCase() === APPROVED_EMPLOYEE_CODE) {
          fetch('/employees', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
          })
              .then(user => {
                this.oktaAuth
                    .signIn({
                      username: this.state.email,
                      password: this.state.password
                    })
                    .then(res =>
                        this.setState({
                          sessionToken: res.sessionToken
                        })
                    );
              })
              .catch(err => console.log);
        } else {
          fetch('/customers', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
          })
              .then(user => {
                this.oktaAuth
                    .signIn({
                      username: this.state.email,
                      password: this.state.password
                    })
                    .then(res =>
                        this.setState({
                          sessionToken: res.sessionToken
                        })
                    );
              })
              .catch(err => console.log);
        }


      }

      render() {
        if (this.state.sessionToken) {
          this.props.auth.redirect({ sessionToken: this.state.sessionToken });
          return null;
        }

        return (
            <Grid className='form-backsplash'>
              <Grid.Column className='form-wrapper' mobile={14} tablet={10} computer={6}>
              <Segment raised style={{padding: 26}}>
                <Header as='h3' icon textAlign='center'>
                  <Icon name='signup' color='grey' circular />
                  <Header.Content>Register for EZ-Dine</Header.Content>
                </Header>
                <Popup
                    inverted
                    position='top center'
                    content='Have an employee code? Click here to enter it'
                    trigger={
                      <Label as='a' corner='right' icon='user secret' onClick={this.handleEmployeeCodeReveal}/>
                    } />
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        icon='at'
                        iconPosition='left'
                        placeholder='Email' />
                  </Form.Field>
                  <Form.Field>
                    <Input
                        type="text"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                        icon='user outline'
                        iconPosition='left'
                        placeholder='First Name' />
                  </Form.Field>
                  <Form.Field>
                    <Input
                        type="text"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                        icon='user'
                        iconPosition='left'
                        placeholder='Last Name' />
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
                  {this.state.shouldDisplayEmployeeCode ?
                      <Form.Field>
                        <Input
                            type="text"
                            id="employeeCode"
                            value={this.state.employeeCode}
                            onChange={this.handleEmployeeCodeChange}
                            icon='user secret'
                            iconPosition='left'
                            placeholder='Employee Code (optional)'/>
                      </Form.Field>
                      : null
                  }
                  <Button type="submit" id="submit" primary icon labelPosition='right'>
                    Register
                    <Icon name='right arrow'/>
                  </Button>
                </Form>
              </Segment>
              </Grid.Column>
            </Grid>
        );
      }
    }
);
