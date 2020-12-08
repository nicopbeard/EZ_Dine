import React from 'react';
import { withAuth } from '@okta/okta-react';
// import {Button, Divider, Grid, Header, Icon, Label, List} from "semantic-ui-react";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null, 
            orders: [],
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        // this.handleItemOrder = this.handleItemOrder.bind(this);
    }

    async getCurrentUser() {
        this.props.auth.getUser().then((user) => {
            this.setState({ user });
        });
    }

    componentDidMount() {
        this.getCurrentUser();
        console.log('user: ' + this.state.user)
        // fetch('/')
    }


    render() {
        return (
            <div>
                <h2>Settle Tab</h2>
            </div>
        );
    }
};

export default withAuth(Order);