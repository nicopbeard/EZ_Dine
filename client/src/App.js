import React, { Component, useContext, createContext, useState } from 'react';
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
	Link,
	Redirect,
  	useHistory,
   	useLocation  
} from 'react-router-dom';

class App extends Component {

	render() {
		return (
			<ProvideAuth>
				<Router>
					<div className="App">
						<Header inverted className="App-header" textAlign="center">
							<Container>
								<img src={logo} className="App-logo" alt="logo" />
								<h1 className="App-title" >EZ Dine</h1>
							</Container>
						</Header>
						<AuthButton />
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
							<Route path="/login">
              					<LoginPage />
           			 		</Route>
							<PrivateRoute path='/menu'>
								<Container>
									<Menu/>
								</Container>
							</PrivateRoute>
							<PrivateRoute path='/customers'>
								<Container>
									<Customers/>
								</Container>
							</PrivateRoute>
							<PrivateRoute path='/employees'>
								<Container>
									<Employees/>
								</Container>	
							</PrivateRoute>
							
						</Switch>
					</div>
				</Router>
			</ProvideAuth>
		);
	}
}

const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
	  fakeAuth.isAuthenticated = true;
	  setTimeout(cb, 100); // fake async
	},
	signout(cb) {
	  fakeAuth.isAuthenticated = false;
	  setTimeout(cb, 100);
	}
  };

const authContext = createContext();

function ProvideAuth({ children }) {
  	const auth = useProvideAuth();
  	return (
    	<authContext.Provider value={auth}>
      		{children}
    	</authContext.Provider>
  	);
}

function useAuth() {
	return useContext(authContext);
}

function useProvideAuth() {
	const [user, setUser] = useState(null);
  
	const signin = cb => {
	  return fakeAuth.signin(() => {
		setUser("user");
		cb();
	  });
	};
  
	const signout = cb => {
	  return fakeAuth.signout(() => {
		setUser(null);
		cb();
	  });
	};
	return {
		user,
		signin,
		signout
	};
}

function AuthButton() {
	let history = useHistory();
	let auth = useAuth();
  
	return auth.user ? (
	  <p>
		Welcome!{" "}
		<button
		  onClick={() => {
			auth.signout(() => history.push("/"));
		  }}
		>
		  Sign out
		</button>
	  </p>
	) : (
	  <p>You are not logged in.</p>
	);
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
	let auth = useAuth();
	return (
	  <Route
		{...rest}
		render={({ location }) =>
		  auth.user ? (
			children
		  ) : (
			<Redirect
			  to={{
				pathname: "/login",
				state: { from: location }
			  }}
			/>
		  )
		}
	  />
	);
}

function LoginPage() {
	let history = useHistory();
	let location = useLocation();
	let auth = useAuth();
  
	let { from } = location.state || { from: { pathname: "/" } };
	let login = () => {
	  auth.signin(() => {
		history.replace(from);
	  });
	};
  
	return (
	  <div>
		<p>You must log in to view the page at {from.pathname}</p>
		<button onClick={login}>Log in</button>
	  </div>
	);
  }
  
export default App;
