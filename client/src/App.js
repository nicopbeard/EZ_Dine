import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/Customers';
import Employees from './components/Employees';
import Menu from './components/Menu';
import {Container, Header} from "semantic-ui-react";
import {
	BrowserRouter as Router,
  	Switch,
  	Route,
  	Link
} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header inverted className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">EZ Dine</h1>
					</Header>
					<nav>
						<ul>
							<li>
								<Link to='/menu'>Menu</Link>
							</li>
							<li>
								<Link to='/customers'>Customers</Link>
							</li>
							<li>
								<Link to='/employees'>Employees</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<Route path='/menu'>
							<Container>
								<Menu/>
							</Container>
						</Route>
						<Route path='/customers'>
							<Container>
								<Customers/>
							</Container>
						</Route>
						<Route path='/employees'>
							<Container>
								<Employees/>
							</Container>	
						</Route>
					</Switch>
				</div>
			</Router>
			
		);
	}
}

export default App;
