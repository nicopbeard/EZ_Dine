import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import {Container} from "semantic-ui-react";
import Navigation from "./components/shared/Navigation";
import {Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/auth/LoginPage";
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import RegistrationForm from "./components/auth/RegistrationForm";
import ProfilePage from "./components/auth/ProfilePage";
import config from './app.config';
import order from './components/Order';
import Submitted from './components/Submitted';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Navigation />
				<main>
					<Route path='/register' component={RegistrationForm}/>
					<Route
							path='/login'
							render={() => <LoginPage baseUrl={config.url}/>}
					/>
					<Container>
						<Route path='/' exact component={HomePage} />
						<Route path='/implicit/callback' component={ImplicitCallback} />
						{/*@TODO: add conditional here based on what user is logged into*/}
						<SecureRoute path='/profile' component={ProfilePage}/>
						<SecureRoute path='/order' component={order}/>
						<SecureRoute path='/menu' component={Menu}/>
						<SecureRoute path='/submitted' component={Submitted}/>
					</Container>
				</main>
			</div>
		);
	}
}

export default App;
