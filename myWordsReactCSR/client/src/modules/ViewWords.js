import React from 'react';
import axios from 'axios';
import R from 'ramda';
import ViewWordDetail from './ViewWordDetail';
import ViewWordsFilter from './ViewWordsFilter';

export default class ViewWords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {words: []};
        this.removeWordOnUI = this.removeWordOnUI.bind(this);
        this.displayByFamilarity = this.displayByFamilarity.bind(this);
    }

    componentWillMount() {
	  axios.get('/api/words')
	    .then(response => {
            this.setState({"words":response.data});
	    });
	}

    displayByFamilarity(familarity) {
        axios.get('/api/wordsByFamilarity/' + familarity)
            .then(response => {
                this.setState({"words":response.data});
            });
    }

	removeWordOnUI(word) {
		var pos = R.findIndex(R.propEq('key', word))(this.state.words);
		var words = this.state.words;
		words.splice(pos, 1);
		this.setState({words: words});
	}

    render() {
    	var words = this.state.words;
        var wordList = words.map((word) => {
                        return (
                        		<div className="list-group-item">
				                    <ViewWordDetail word={word} removeWordOnUI={this.removeWordOnUI}/>
				                </div>
                        	);
                      });
        return  (<div className="container">
                    <ViewWordsFilter displayByFamilarity={this.displayByFamilarity}/> 
        			<div className="list-group">
						{ wordList }
					</div>			
        		</div>);
    }
}