import React, { Component } from 'react';
import './customers.css';

class Employees extends Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    fetch('/employees')
        .then(res => res.json())
        .then(employees => this.setState({employees}, () => console.log('Employees fetched...', employees)));
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
        </div>
    );
  }
}

export default Employees;