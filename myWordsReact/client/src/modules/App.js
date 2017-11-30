import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>My Words</h1>
                <ul role="nav">
                    <li><Link to="/viewWords">View</Link></li>
                    <li><Link to="/addWords">Add New</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}