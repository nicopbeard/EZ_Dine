import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/Customers';
import Menu from './components/Menu';
import {Container, Header} from "semantic-ui-react";
import Navigation from "./components/shared/Navigation";
import {Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/auth/LoginPage";
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import RegistrationForm from "./components/auth/RegistrationForm";
import ProfilePage from "./components/auth/ProfilePage";
import config from './app.config';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navigation />
				<main>
					<Route path='/' exact component={HomePage} />
					<Route
							path='/login'
							render={() => <LoginPage baseUrl={config.url}/>}
					/>
					<Route path='/implicit/callback' component={ImplicitCallback} />
					<Route path='/register' component={RegistrationForm}/>
					<SecureRoute path='/profile' component={ProfilePage}/>
					<SecureRoute path='/menu' component={Menu}/>
				</main>
				{/*<Header inverted className="App-header">*/}
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					{/*<h1 className="App-title">EZ Dine</h1>*/}
				{/*</Header>*/}
				{/*<Container>*/}
					{/*<Menu/>*/}
					{/*<Customers />*/}
				{/*</Container>*/}
			</div>
		);
	}
}

export default App;
