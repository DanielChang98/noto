import React, { Component } from "react"
import firebase from "firebase/app"
import './board.css'

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
        this.notesRef = firebase.database().ref("notes/");
    }

    toggleIsInputMode = e => {
        this.setState({
            isInputMode: !this.state.isInputMode},
            () => {
                if (this.state.isInputMode){
                    this.props.toggleIsInputMode(this.props.cardKey);
                    setTimeout(()=> {
                        this.refs.note.focus(); 
                    });
                }
            });
    }

    toggleIsSaveDisabled () {
        this.setState(
            {isSaveDisabled: (this.refs.note.length < this.NOTE_MIN_LENGTH)}
        )        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var note = {
            cardKey: this.props.cardKey,
            text: this.refs.note.value
        };
        this.notesRef.push(note);
        this.refs.note.value = "";
        this.toggleIsSaveDisabled();
        this.props.toggleIsInputMode(null);
        this.toggleIsInputMode();
    }


    handleChange = e => {
        this.toggleIsSaveDisabled();
    };

    render () {
        return (
            <div className="card-footer">
                {!this.state.isInputMode ? 
                <div>
                    <p style={{textAlign: "left"}}>
                        <a href="#" onClick={() => this.toggleIsInputMode ()}>
                            Add Note
                        </a>
                    </p>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="noteform-group">
                            <textarea 
                                className="noteform-control" 
                                placeholder="Type something.."
                                ref="note" 
                                style={{width: "100%"}}
                                onChange={this.handleChange} required>
                            </textarea>
                        </div>
                        <div className="noteform-group">                                               
                            <input 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={this.state.isSaveDisabled} 
                                value="Save" /> &nbsp;
                            <input 
                                type="button" 
                                className="btn btn-default" 
                                value="Cancel" 
                                onClick={this.toggleIsInputMode}/>                            
                        </div>
                    </form>
                </div>
            }
        </div>
        );
    }
}

export default ListCardForm;