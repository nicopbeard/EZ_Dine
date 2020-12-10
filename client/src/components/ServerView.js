import React from 'react';
import {withAuth} from '@okta/okta-react';
import {Button, Card, Divider, Grid, Header, Icon, Label, List} from "semantic-ui-react";

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
        // fetch("/menu")
        //     .then(res => res.json())
        //     .then(menu => this.setState({menu}, () => console.log("Menu fetched...", menu)))
        this.getOrders();
      }

      getOrders() {
        const fetchedOrders = [
          {
            customer: 'ejs3320@lehigh.edu',
            items: [
              {
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                menu_item: 'breadsticks',
                special_requests: '',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              },
              {
                menu_item: 'pasta',
                special_requests: 'light sauce',
                status: 'in progress',
                date: Date.now(),
                price: 10.99
              }
            ]
          }

        ];
        this.state.orders = fetchedOrders;
        console.log(this.state);
      }


      render() {
        const currentOrders = this.state.orders.map((order) => (
            <Card>
              <Card.Content>
                <Card.Header>{order.customer}</Card.Header>
                <List>
                  {
                    order.items.map((item) => (
                        <List.Item>
                          <List.Content>
                            <List.Header>{item.menu_item}</List.Header>
                            <List.Description as='a'>Special Requests: {item.special_requests}</List.Description>
                          </List.Content>
                        </List.Item>
                    ))
                  }
                </List>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    Complete
                  </Button>
                </div>
              </Card.Content>
            </Card>
        ))
        return (
            <div>
              <h2 style={{'textAlign': 'center'}}>Current Orders</h2>
              <Card.Group centered items={currentOrders}/>
            </div>
        );
      }
    })
