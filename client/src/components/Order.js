import React from 'react';
import { withAuth } from '@okta/okta-react';
import { List } from 'semantic-ui-react';

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

    getCurrentUser() {
        this.props.auth.getUser().then((user) => {
            this.setState({ user }, () => {
                // console.log(user._id)
                fetch('/customers/'+user._id+'/orders')
                    .then(res => res.json())
                    .then(orders => this.setState({orders}, () => {
                        console.log(orders)
                        console.log('Orders fetched...')
                    }))
            });
        });
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    handleSpecialRequest(itemId, e) {
        var request = e.target.value
        console.log('itemId: '+ itemId)
        console.log('request: ' + request)
        var orders = this.state.orders.map(item => {
            if (item._id === itemId) {
                item.special_requests = request
            }
            return item
        });
        this.setState({ orders }, () => console.log('updated order'))

    }

    renderListItems = (orderItems) => {
        return [
            orderItems.map((item) => (
                <List.Item key={item._id}>
                    <List.Content>
                        <List.Header>{item.menu_item}</List.Header>
                        <List.Description>
                            {'$10.99'}
                        </List.Description>
                        <List.Description>
                            {'Special Requests:'}
                        </List.Description>
                        <input
                            id={'input'+item._id}
                            type={'text'}
                            value={item.special_requests}
                            onChange={value => this.handleSpecialRequest(item._id, value)}
                        />
                    </List.Content>
                </List.Item>
            ))
        ]
    }

    render() {
        const orders = this.state.orders;
        return (
            <div>
                <h2>My Order</h2>
                <List divided relaxed='very'>
                    {this.renderListItems(orders)}
                </List>
            </div>
        );
    }
};

export default withAuth(Order);
