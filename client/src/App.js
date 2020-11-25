import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/Customers';
import Menu from './components/Menu';
import {Container, Header} from "semantic-ui-react";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header inverted className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">EZ Dine</h1>
				</Header>
				<Container>
					<Menu/>
					<Customers />
				</Container>
			</div>
		);
	}
}

export default App;
