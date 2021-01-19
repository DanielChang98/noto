import React, { Component } from "react"
import firebase from "firebase/app"
import './board.css';

class ListForm extends Component {

    constructor () {
        super ();
        this.state = {
            name: "",
            isInputMode: false,
            isSaveDisabled: true
        }
    }

    componentDidMount () {
        this.NAME_MIN_LENGTH = 3;
        this.cardsRef = firebase.database().ref("cards/");
    }

    isNameValid () {
        this.setState({
            isSaveDisabled: (this.refs.name.value.boardKeylength < this.NAME_MIN_LENGTH)
        });
    }

    toggleIsInputMode = e => {
        this.setState({
            isInputMode: !this.state.isInputMode},
            () => {
                if (this.state.isInputMode){
                    setTimeout(()=> {
                        this.refs.name.focus(); 
                    });
                }
            });
    }

    handleChange = e => {
        this.isNameValid();
    };

    handleSubmit = e => {
        e.preventDefault();
        var card = {
            boardKey: this.props.boardKey,
            name: this.refs.name.value
        };
        this.cardsRef.push(card);
        this.refs.name.value = "";
        this.setState({
            name: "",
            isSaveDisabled: true
        });
        this.toggleIsInputMode();
        this.isNameValid();
    }

    

    render () {
        return (
            <div className="cardform-container">
                {!this.state.isInputMode ? 
                <p style={{textAlign: "left", fontSize: "18pt"}}>
                    <a href="#" onClick={() => this.toggleIsInputMode()}>
                        Add Card...
                    </a>
                </p>
                :                               
                <form onSubmit={this.handleSubmit}>
                    <label style={{color:"#004BA4", fontSize:"22px", fontWeight:"bolder"}}>
                            New Card
                    </label>
                    <p className="cardform-group">
                        <input 
                            type="text" 
                            className="cardform-control" 
                            placeholder="New card name..." 
                            ref="name"
                            onChange={this.handleChange} required/>
                    </p>
                    <div className="cardform-group">
                        <input 
                            type="submit" 
                            className="btn btn-primary" 
                            value="Save" 
                            disabled={this.state.isSaveDisabled} 
                        /> &nbsp;
                        <input 
                            type="button" 
                            className="btn btn-default" 
                            value="Cancel"
                            onClick={this.toggleIsInputMode}
                        />
                    </div>
                </form>
                }
            </div>
        );
    }
}

export default ListForm;