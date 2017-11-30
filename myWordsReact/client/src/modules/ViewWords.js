import React from 'react';
import axios from 'axios';
import { Button, Badge, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import R from 'ramda';
import ViewWordDetail from './ViewWordDetail';

export default class ViewWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {words: []};
        this.removeWordOnUI = this.removeWordOnUI.bind(this);
    }

    componentWillMount() {
	  axios.get('/api/words')
	    .then(response => {
	    	this.setState({"words":response.data});
	    });
	}

	removeWordOnUI(word) {
		console.log('the word to remove ', word);
		var pos = R.findIndex(R.propEq('key', word))(this.state.words);
		var words = this.state.words;
		words.splice(pos, 1);
		this.setState({words: words});
	}

    render() {
    	var words = this.state.words;
        var wordList = words.map((word) => {
                        return (
                        		<ListGroupItem>
				                    <ViewWordDetail word={word} removeWordOnUI={this.removeWordOnUI}/>
				                </ListGroupItem>
                        	);
                      });
        return  (<div className="container">
        			<ListGroup>
						{ wordList }
					</ListGroup>			
        		</div>);
    }
}