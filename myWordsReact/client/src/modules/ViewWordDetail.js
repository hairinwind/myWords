import React from 'react';
import axios from 'axios';
import { Button, Badge, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

export default class ViewWordDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, sentences:[]};
        this.open = this.open.bind(this);
    }

    open() {
        axios.get('/api/word/' + this.props.word.key)
            .then(response => {
                this.setState({
                    open:!this.state.open, 
                    sentences: response.data.map(sentenceResult => sentenceResult._source)
                });
            });

    }

    setWordFamilarity(familarity) {
        return () => {axios.put('/api/word/familarity/' + this.props.word.key + "/" + familarity)
                        .then(response => {
                            this.setState({open:false, sentences:[]});
                            this.props.removeWordOnUI(this.props.word.key);
                        });
                    };
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.word.key}  <Badge>{this.props.word.doc_count}</Badge>
                    <span className="pull-right"> 
                        <Button bsStyle="danger" onClick={this.setWordFamilarity(2)} /> 
                        <Button bsStyle="warning" onClick={this.setWordFamilarity(1)}/> 
                        <Button bsStyle="success" onClick={this.setWordFamilarity(0)}/> 
                        <Button bsStyle="muted" onClick={this.setWordFamilarity(3)} /> 
                        <button className="btn btn-box-tool" onClick={this.open}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                </div>
                <Panel collapsible expanded={this.state.open}>
                    <ul>
                        {
                            this.state.sentences.map( sentence => 
                                <li>{sentence.english}<br/>{sentence.chinese}</li>
                            )
                        }
                    </ul>
                </Panel>
            </div>
            );
    }
}            