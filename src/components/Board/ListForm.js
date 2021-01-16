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
        this.listsRef = firebase.database().ref("lists/");
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
        var list = {
            boardKey: this.props.boardKey,
            name: this.refs.name.value
        };
        this.listsRef.push(list);
        this.refs.name.value = "";
        this.setState({
            name: "",
            isSaveDisabled: true
        });
    }

    render () {
        return (
            <div className="listform-container">
                <div className="listform-panel-default">
                    <div className="listform-panel-heading">
                        {this.state.name.length > 0 ? this.state.name : 'List Name'}
                    </div>            
                    <div className="listform-body">                     
                        <form onSubmit={this.handleSubmit}>
                            <div className="listform-group">
                                <input 
                                    type="text" 
                                    className="listform-control" 
                                    placeholder="New list name..." 
                                    ref="name"
                                    onChange={this.handleChange} />
                            </div>
                            <div className="listform-group">
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
            </div>
        );
    }
}

export default ListForm;