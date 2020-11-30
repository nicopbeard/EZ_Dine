import React from 'react';
import { withAuth } from '@okta/okta-react';
import {Button, Divider, Grid, Header, Icon, Label, List} from "semantic-ui-react";

export default withAuth(
    class Menu extends React.Component {
      constructor(props) {
        super(props);
        this.state = { user: null };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleItemOrder = this.handleItemOrder.bind(this);
      }

      async getCurrentUser() {
        this.props.auth.getUser().then((user) => {
          this.setState({user});
        });
      }

      componentDidMount() {
        this.getCurrentUser();
        // Hard coded menu items for now
        this.setState({
          menu: [
            {
              title: 'Goat Cheese Won Tons',
              description: 'fresh apples, mushroom, ginger, and lime',
              price: 30.00,
              category: 'APP'
            },
            {
              title: 'Potato Skins',
              description: 'stuffed with bacon, sour cream, and scallops',
              price: 17.45,
              category: 'APP'
            },
            {
              title: 'Seafood Fettuccine',
              description: 'fresh apples, mushroom, ginger, and lime',
              price: 26.55,
              category: 'MAIN'
            },
            {
              title: 'Whiskey Bacon Burger',
              description: 'Beef patty topped with pepper jack, onions, bacon, LTO',
              price: 11.00,
              category: 'MAIN'
            },
            {
              title: 'Porcini Risotto',
              description: 'Delicate grains served in a porcini-cheese sauce',
              price: 19.95,
              category: 'MAIN'
            },
            {
              title: 'Tiramisu Budino',
              description: 'chocolate hazlenut pudding, marscapone mousse, espresso "ice", espresso biscotti',
              price: 12.99,
              category: 'DES'
            },
            {
              title: 'Pine Nut Tart',
              description: 'brown butter gelato, rosemary almond crust, raspberry sauce',
              price: 8.49,
              category: 'DES'
            },
            {
              title: 'Strawberry Panna Cotta',
              description: 'chocolate gelato, braised rhubarb, marshmallow, strawberry chips',
              price: 16.87,
              category: 'DES'
            }
          ]
        })
      }

      handleItemOrder = function(event, item) {
        console.log(this.state);
        console.log(item.title);
        console.log(item.price);
        const menuItem = {menu_item: item.title, special_requests: 'none'};
        // @TODO: we should prob also track prices of items as they are ordered to sum the "total bill" easily
        fetch(`/customers/${this.state.user._id}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(menuItem)
        }).then((orderedItem) => {
          // TODO: do we want to update the state here?
          console.log(orderedItem);
        });
      };

      renderMenuItems = function (menuItems) { // called for each menu category and passed that categories items
        return [
          menuItems.map((item) => (
              <List.Item key={item.title}>
                <List.Content>
                  <List.Header>{item.title}</List.Header>
                  <List.Description>{item.description}</List.Description>
                  <br/>
                  <Grid columns={2}>
                    <Grid.Column>
                      <Label horizontal basic>
                        ${item.price}
                      </Label>
                    </Grid.Column>
                    <Grid.Column>
                      {/*TODO: This button should open a modal with options to for "special requests"*/}
                      <Button animated='vertical' title={item.title} price={item.price} floated='right' positive basic compact onClick={this.handleItemOrder}>
                        <Button.Content visible>Add to Tab</Button.Content>
                        <Button.Content hidden>
                          <Icon name='plus square'/>
                        </Button.Content>
                      </Button>
                    </Grid.Column>
                  </Grid>
                </List.Content>
              </List.Item>
          ))
        ]

      };

      render() {
        if (!this.state.user) return null;
        // do all menu in one, and add the headers/separaters in between each on a sort?
        const appetizers = this.state.menu.filter((item) => {
          return item.category === 'APP';
        });
        const mains = this.state.menu.filter((item) => {
          return item.category === 'MAIN';
        });
        const desserts = this.state.menu.filter((item) => {
          return item.category === 'DES';
        });
        //TODO: need to take this email and key off it to request _id for backend
        return (
            <section className="menu">
              <Grid columns={3} divided>
                <Grid.Row>
                  {/*TODO: look into three column fluid layout that stacks on mobile*/}
                  <Grid.Column>
                    <Header as='h3' textAlign='center'>
                      Appetizers
                    </Header>
                    <Divider style={{width: 60, margin: 'auto'}}/>
                    <List divided relaxed='very'>
                      {this.renderMenuItems(appetizers)}
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3' textAlign='center'>
                      Main Course
                    </Header>
                    <Divider style={{width: 60, margin: 'auto'}}/>
                    <List divided relaxed='very'>
                      {this.renderMenuItems(mains)}
                    </List>
                  </Grid.Column>
                  <Grid.Column>
                    <Header as='h3' textAlign='center'>
                      Dessert
                    </Header>
                    <Divider style={{width: 60, margin: 'auto'}}/>
                    <List divided relaxed='very'>
                      {this.renderMenuItems(desserts)}
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </section>
        );
      }
    }
);
