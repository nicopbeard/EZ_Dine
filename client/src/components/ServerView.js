import React from 'react';
import {withAuth} from '@okta/okta-react';
import { Card } from "semantic-ui-react";

export default withAuth(
    class ServerView extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          user: null,
          orders: []
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getOrders = this.getOrders.bind(this);
      }

      async getCurrentUser() {
        this.props.auth.getUser().then((user) => {
          this.setState({user});
        });
      }

      componentDidMount() {
        this.getCurrentUser();
        this.getOrders();
      }

      getOrders() {
        const fetchedOrders = [
              {
                first_name: 'Elliot',
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                first_name: 'Elliot',
                menu_item: 'breadsticks',
                special_requests: '',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                first_name: 'Elliot',
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                first_name: 'Elliot',
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              }
        ];
        this.setState({orders: fetchedOrders});
        console.log(this.state);
      }


      render() {
        const currentOrders = this.state.orders.map((order) => {
          return {
            header: order.first_name,
            description: order.status,
            meta: order.menu_item,
          }
        });
        return (
            <div>
              <h2 style={{'textAlign': 'center'}}>Current Orders</h2>
              <Card.Group centered items={currentOrders}/>
            </div>
        );
      }
    })
