import React from 'react';
import { withAuth } from '@okta/okta-react';
import {Button, Divider, Grid, Header, Icon, Label, List} from "semantic-ui-react";

export default withAuth(
    class Menu extends React.Component {
      constructor(props) {
        super(props);
        this.state = { user: null, menu: [] };
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
        fetch("/menu")
            .then(res => res.json())
            .then(menu => this.setState({menu}, () => console.log("Menu fetched...", menu)))
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
        }).catch((err) => {
          console.log(err);
        });
      };

      renderMenuItems = function (menuItems) { // called for each menu category and passed that categories items
        return [
          menuItems.map((item) => (
              <List.Item key={item.item}>
                <List.Content>
                  <List.Header>{item.item}</List.Header>
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
                      <Button animated='vertical' title={item.item} price={item.price} floated='right' positive basic compact onClick={this.handleItemOrder}>
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
    // do all menu in one, and add the headers/separaters in between each on a sort?
    const appetizers = this.state.menu.filter((item) => {
      return item.class === 'appetizer';
    });
    const entrees = this.state.menu.filter((item) => {
      return item.class === 'entree';
    });
    const desserts = this.state.menu.filter((item) => {
      return item.class === 'dessert';
    });
    const beverages = this.state.menu.filter((item) => {
      return item.class === 'beverage';
    });
    return (
        <div>
          <h2 style={{'textAlign' : 'center'}}>Todays Menu</h2>
          <Grid columns={4} divided>
            <Grid.Row>
              {/*TODO: look into three column fluid that stacks them as needed*/}
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
                  Main Courses
                </Header>
                <Divider style={{width: 60, margin: 'auto'}}/>
                <List divided relaxed='very'>
                  {this.renderMenuItems(entrees)}
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' textAlign='center'>
                  Desserts
                </Header>
                <Divider style={{width: 60, margin: 'auto'}}/>
                <List divided relaxed='very'>
                  {this.renderMenuItems(desserts)}
                </List>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' textAlign='center'>
                  Beverages
                </Header>
                <Divider style={{width: 60, margin: 'auto'}}/>
                <List divided relaxed='very'>
                  {this.renderMenuItems(beverages)}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
})
