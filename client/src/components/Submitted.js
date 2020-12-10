import React from 'react';
import { withAuth } from '@okta/okta-react';

class Submitted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div>
                <h2 style={{'textAlign' : 'center'}}>Your order has been submitted</h2>
                <h3>Enjoy</h3>
            </div>
        );
    }
};

export default withAuth(Submitted);
