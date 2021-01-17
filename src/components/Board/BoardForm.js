import React, { Component } from "react"
import firebase from "firebase/app"
import './board.css';

class BoardForm extends Component{
    
    constructor () {
        super ();
        this.state = {
            isInputMode: false,
            isSaveDisabled: true
        }
    }
    componentDidMount() {
        this.MIN_LENGTH = 3;
        this.boardsRef = firebase.database().ref("boards/");
    }

    toggleInputMode = e => {
        this.setState({isInputMode: !this.state.isInputMode}, function() {
            if (this.state.isInputMode) {
                // setTimeout(function() {
                //     this.refs.name.focus();
                //     this.refs.description.focus();           
                // }.bind(this));
                setTimeout(()=> {
                    this.refs.name.focus();
                    this.refs.description.focus(); 
                });
            }          
        });
    }
    
    toggleIsSaveDisabled () {
        this.setState(
            {
                isSaveDisabled: (this.refs.name.value.length < this.MIN_LENGTH),
                isSaveDisabled: (this.refs.description.value.length < this.MIN_LENGTH)
            }
        );
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.boardsRef.push({
            title: this.refs.name.value,
            description: this.refs.description.value
        });
        this.refs.name.value = "";
        this.toggleInputMode();
        this.toggleIsSaveDisabled();
    }
        
    handleChange = e => {
        this.toggleIsSaveDisabled();
    };
    

    render (){
        return (
            <div className="createBoardForm">
            <div className="panel">
                <div className="board-body">
                {
                    !this.state.isInputMode ?
                    <p><a href="#" onClick = { () => this.toggleInputMode ()}>
                        Create new board...</a>
                    </p>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="enter-board-details" 
                                placeholder="New board name..." 
                                ref="name" 
                                onChange={this.handleChange} required/>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="enter-board-description"
                                placeholder="Board Description..."
                                ref="description"
                                onChange={this.handleChange} required/>
                        </div>
                        <div className="enter-board-details">
                            <input 
                                type="submit" 
                                className="save-button" 
                                value="Save" 
                                disabled={this.state.isSaveDisabled} /> &nbsp;
                            <input 
                                type="button" 
                                className="cancel-button" 
                                value="Cancel" 
                                onClick={this.toggleInputMode} />
                        </div>
                    </form>
                }
                </div>
            </div>
        </div>
        );
    }

}

export default BoardForm;