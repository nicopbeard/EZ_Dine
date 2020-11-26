import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
	constructor() {
		super();
		this.state = {
			customers: [],
			employees: []
		};
	}

	componentDidMount() {
		fetch('/employees')
			.then(res => res.json())
			.then(employees => this.setState({employees}, () => console.log('Employees fetched...', employees)));
		fetch('/customers')
			.then(res => res.json())
			.then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
	}

	render() {
		return (
			<div>
				<h2>Employees</h2>
				<ul>
					{this.state.employees.map(employee => 
						<li key={employee._id}> User:{employee.username} PW:{employee.password} </li>
					)}
				</ul>
				<h2>Customers</h2>
				<ul>
					{this.state.customers.map(customer => 
						<li key={customer._id}> User:{customer.username} PW:{customer.password} </li>
					)}
				</ul>
			</div>
		);
	}
}

export default Customers;
