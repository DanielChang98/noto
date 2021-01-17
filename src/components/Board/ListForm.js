import React, { Component } from "react"
import firebase from "firebase/app"

class ListForm extends Component {

    constructor () {
        super ();
        this.state = {
            name: "",
            isSaveDisabled: true
        }
    }

    componentDidMount () {
        this.NAME_MIN_LENGTH = 3;
        this.cardsRef = firebase.database().ref("cards/");
    }

    isNameValid () {
        this.setState({
            isSaveDisabled: (this.state.name.length < this.NAME_MIN_LENGTH)
        });
    }

    handleChange = e => {
        this.setState({name: e.target.value});
        this.isNameValid();  

    }

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
    }

    render () {
        return (
            <div className="cardform-container">
                <div className="cardform-panel-heading">
                    {this.state.name.length > 0 ? this.state.name : 'Card Name'}
                </div>            
                <div className="cardform-body">                     
                    <form onSubmit={this.handleSubmit}>
                        <div className="cardform-group">
                            <input 
                                type="text" 
                                className="cardform-control" 
                                placeholder="New card name..." 
                                ref="name"
                                onChange={this.handleChange} />
                        </div>
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
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ListForm;