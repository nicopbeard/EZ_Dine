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
        fetch("/employees/5fd19b6651f6abc1e843e083/")
            .then(res => res.json())
            .then(kitchenUser => this.setState({orders: kitchenUser.orders}, () => console.log("Orders Fetched...", kitchenUser.orders)))
      }

      render() {
        const currentOrders = this.state.orders.map((order) => {
          return {
            header: order.customer_email,
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
