import React, { Component } from "react"
import firebase from "firebase/app"

class ListCardForm extends Component {

    constructor() {
        super();
        this.state = {
            isInputMode: false,
            isSaveDisabled: true
        }
      }

    componentDidMount () {
        this.NOTE_MIN_LENGTH = 3;
        this.cardsRef = firebase.database().ref("cards/")
    }

    toggleIsInputMode = e => {
        this.props.toggleIsInputMode(this.props.listKey);
        setTimeout(function() {
            this.refs.note.focus();            
        }.bind(this));
    }

    toggleIsSaveDisabled () {
        this.setState(
            {isSaveDisabled: (this.refs.note.length < this.NOTE_MIN_LENGTH)}
        )        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var card = {
            listKey: this.props.listKey,
            text: this.refs.note.value
        };
        this.cardsRef.push(card);
        this.refs.note.value = "";
        this.toggleIsSaveDisabled();
        this.props.toggleIsInputMode(null);
    }

    handleCancel () {
        this.toggleIsSaveDisabled();        
        this.props.toggleIsInputMode(null);                
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({isInputMode: nextProps.isInputMode}); 
    }

    handleChange = e => {
        this.toggleIsSaveDisabled();
    };

    render () {
        return (
            <div>
                {!this.state.isInputMode ? 
                <div>
                    <p style={{textAlign: "right"}}>
                        <a href="#" onClick={() => this.toggleIsInputMode ()}>
                            Add Card
                        </a>
                    </p>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="cardform-group">
                            <textarea 
                                className="cardform-control" 
                                ref="note" 
                                onChange={this.handleChange} required>
                            </textarea>
                        </div>
                        <div className="cardform-group">                                               
                            <input 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={this.state.isSaveDisabled} 
                                value="Save" /> &nbsp;
                            <input 
                                type="button" 
                                className="btn btn-default" 
                                value="Cancel" 
                                onClick={this.handleCancel}/>                            
                        </div>
                    </form>
                </div>
            }
        </div>
        );
    }
}

export default ListCardForm;