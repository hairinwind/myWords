import React from 'react';
import axios from 'axios';

export default class ViewWordsFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    displayByFamilarity(familarity) {
        return () => {
            this.props.displayByFamilarity(familarity);
        };
    }

    render() {
        return  (
                    <div role="toolbar" className="btn-toolbar">
                        <button type="button" className="btn btn-danger btn-md" onClick={this.displayByFamilarity(2)}>High</button>
                        <button type="button" className="btn btn-warning btn-md" onClick={this.displayByFamilarity(1)}>Mdedium</button> 
                        <button type="button" className="btn btn-success btn-md" onClick={this.displayByFamilarity(0)}>Low</button> 
                        <button type="button" className="btn btn-info btn-md" onClick={this.displayByFamilarity()}>No Filter</button>
                    </div>
        		);
    }
}