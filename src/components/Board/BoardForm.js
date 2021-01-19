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
        const userID = sessionStorage.getItem("userID");
        this.MIN_LENGTH = 3;
        this.boardsRef = firebase.database().ref("boards/"+userID);
    }

    toggleInputMode = e => {
        this.setState({isInputMode: !this.state.isInputMode}, function() {
            if (this.state.isInputMode) {
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
                isSaveDisabled: 
                    (this.refs.name.value.length < this.MIN_LENGTH || this.refs.description.value.length < this.MIN_LENGTH),
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
                {
                    !this.state.isInputMode ?
                    <p><a href="#" onClick = { () => this.toggleInputMode ()}>
                        Create new board...</a>
                    </p>
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label style={{color:"#004BA4", fontSize:"22px", fontWeight:"bolder"}}>
                            New Board
                        </label>
                        <p className="form-group">
                            <input 
                                type="text" 
                                className="enter-board-details" 
                                placeholder="New board name..." 
                                ref="name" 
                                style={{width: "100%"}}
                                onChange={this.handleChange} required/>
                        </p>
                        <p>
                            <input
                                type="text"
                                className="enter-board-description"
                                placeholder="Board Description..."
                                ref="description"
                                style={{width: "100%"}}
                                onChange={this.handleChange} required/>
                        </p>
                        <div>
                            <input 
                                type="submit" 
                                className="btn btn-primary" 
                                value="Save" 
                                disabled={this.state.isSaveDisabled} /> &nbsp;
                            <input 
                                type="button" 
                                className="btn btn-default" 
                                value="Cancel" 
                                onClick={this.toggleInputMode} />
                        </div>
                    </form>
                }
        </div>
        );
    }

}

export default BoardForm;