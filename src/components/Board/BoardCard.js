import React, { Component } from "react"
import { Link, Route } from "react-router-dom";

class BoardCard extends Component {

    render () {
        return (
            <div className="board-title"> 
                <div className="board-body">
                    <h4
                        onClick={() => (sessionStorage.setItem('board',JSON.stringify(this.props.board)))}
                    ><Link to ={ "/board/:key" + this.props.board.key}> {this.props.board.title} </Link></h4>
                </div>
        </div>
        );
    }
}

export default BoardCard;