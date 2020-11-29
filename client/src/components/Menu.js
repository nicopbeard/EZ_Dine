import React, { Component } from 'react';
import './customers.css';
import {Button, Divider, Grid, Header, Icon, Label, List} from "semantic-ui-react";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      menu: []
    };
  }

  componentDidMount() {
    fetch("/menu")
      .then(res => res.json())
      .then(menu => this.setState({menu}, () => console.log("Menu fetched...", menu)))
  }
  
  renderMenuItems = function(menuItems) { // called for each menu category and passed that categories items
    return [
        menuItems.map((item) => (
            <List.Item>
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
                    {/*TODO: This button should open a modal with options to */}
                    <Button animated='vertical' floated='right' positive basic compact>
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
    const mains = this.state.menu.filter((item) => {
      return item.class === 'entree';
    });
    const desserts = this.state.menu.filter((item) => {
      return item.class === 'dessert';
    });
    return (
        <div>
          <h2>Todays Menu</h2>
          <Grid columns={3} divided>
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
        </div>
    );
  }
}

export default Menu;
