import React from 'react';
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, Button, Well} from 'react-bootstrap';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
      	}
      	this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
    	e.preventDefault();
    	var data = {
    		sourceTitle: this.sourceTitle.value, 
    		text: this.text.value
    	}
    	axios.post('/api/word/', data)
		  .then(function (response) {
		      //console.log(response);
              this.setState({ 
                message: 'text was saved successfully' 
              });
              this.sourceTitle.value='';
              this.text.value='';
              setTimeout(
                    function() {
                        this.setState({ 
                            message: '' 
                          });
                    }.bind(this)
                    , 5000);
		  }.bind(this))
		  .catch(function (error) {
		      console.log(error);
		  });
    }

    render() {
        var message = "";
        if (this.state.message) {
            message = <Well>{this.state.message}</Well>;
        }
        return (
        	<div className="container">
            	<div>Add Words</div>
                {message}
            	<form>
            		<FormGroup controlId="sourceTitle">
				     	<ControlLabel>Source Title</ControlLabel>
				     	<FormControl type="text" placeholder="soruce title" inputRef={ref => { this.sourceTitle = ref; }}
                             />
				    </FormGroup>
				    <FormGroup controlId="text">
				    	<ControlLabel>English Chinese Text</ControlLabel>
				    	<FormControl componentClass="textarea" placeholder="english/chinese text" rows="10" 
                            inputRef={ref => { this.text = ref; }} />
				    </FormGroup>
				    <Button type="submit" onClick={this.submitForm}>
				    	Submit
				    </Button>
            	</form>
            </div>
        );
    }
}