import React from 'react';
import axios from 'axios';
import { Panel} from 'react-bootstrap';

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
                    {this.props.word.key}  <span class="badge">{this.props.word.doc_count}</span>
                    <span className="pull-right"> 
                        <div role="toolbar" className="btn-toolbar">
                            <button type="button" className="btn btn-danger" onClick={this.setWordFamilarity(2)}></button>
                            <button type="button" className="btn btn-warning" onClick={this.setWordFamilarity(1)}></button>
                            <button type="button" className="btn btn-success" onClick={this.setWordFamilarity(0)}></button>
                            <button type="button" className="btn" onClick={this.setWordFamilarity(3)}></button>
                            <button type="button" className="btn" onClick={this.open}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> 
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