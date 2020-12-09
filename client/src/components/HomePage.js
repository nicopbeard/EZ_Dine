import React from 'react';

export default class HomePage extends React.Component {
  render() {
    return (
        <div>
          <h1 style={{'textAlign' : 'center'}}>Welcome to EZ Dine</h1>
          <img src="https://www.hotelamerica.com.br/wp-content/uploads/2014/10/z03.jpg" style={{'display' : 'block', 'margin-left' : 'auto', 'margin-right' : 'auto'}} alt="Gourmet Food"></img>
        </div>
    );
  }
}