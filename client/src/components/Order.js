import React from 'react';
import { withAuth } from '@okta/okta-react';
import { Button, List, Icon } from 'semantic-ui-react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            orders: [],
            total: 0,
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        // this.handleItemOrder = this.handleItemOrder.bind(this);
    }

    getCurrentUser() {
        this.props.auth.getUser().then((user) => {
            this.setState({ user }, () => {
                // console.log(user._id)
                fetch('/customers/' + user._id + '/orders')
                    .then(res => res.json())
                    .then(orders => this.setState({ orders }, () => {
                        console.log(orders)
                        console.log('Orders fetched...')
                        var total = 0
                        orders.map(o => {
                            if (o.price)
                                total += o.price
                            return o
                        })
                        console.log('total: ' + total)
                        this.setState({ total })
                    }))
            });
        });
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    handleSpecialRequest(itemId, e) {
        var request = e.target.value
        // console.log('itemId: ' + itemId)
        // console.log('request: ' + request)
        var orders = this.state.orders.map(item => {
            if (item._id === itemId) {
                item.special_requests = request
            }
            return item
        });
        this.setState({ orders });
    }

    submitRequest(id) {
        var updated_item = this.state.orders.find(i => i._id === id)
        console.log(updated_item)
        fetch('/customers/' + this.state.user._id + '/orders/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updated_item)
        }).then(console.log('updated order')).catch('you goofed')
    }

    handleRemove(id) {
        fetch('/customers/' + this.state.user._id + '/orders/' + id, {
            method: 'DELETE'
        }).then(console.log('deleted order')).catch('you goofed')
        window.location.reload();
    }

    handlePay() {
        console.log(this.state.user._id)
        fetch('/customers/' + this.state.user._id + '/orders', {
            method: 'DELETE'
        }).then(console.log('deleted order')).catch('you goofed')
        window.location.reload();
    }

    renderListItems = (orderItems) => {
        return [
            orderItems.map((item) => (
                <List.Item key={item._id}>
                    <List.Content>
                        <List.Header>{item.menu_item}</List.Header>
                        <List.Description>{item.price}</List.Description>
                        <List.Description>{'Special Requests:'}</List.Description>
                        <input
                            id={'input' + item._id}
                            type={'text'}
                            value={item.special_requests}
                            placeholder='none'
                            onBlur={() => this.submitRequest(item._id)}
                            onChange={value => this.handleSpecialRequest(item._id, value)}
                        />
                        <Button animated='vertical' floated='right' positive basic negative compact 
                                onClick={() => this.handleRemove(item._id)}>
                            <Button.Content visible>Remove</Button.Content>
                            <Button.Content hidden>
                                <Icon name='trash' />
                            </Button.Content>
                        </Button>
                    </List.Content>
                </List.Item>
            ))
        ]
    }

    render() {
        const orders = this.state.orders;
        return (
            <div>
                <h2 style={{'textAlign' : 'center'}}>My Order</h2>
                <List divided relaxed='very'>
                    {this.renderListItems(orders)}
                </List>
                <h3>Total: ${this.state.total}</h3>
            </div>
        );
    }
};

export default withAuth(Order);
