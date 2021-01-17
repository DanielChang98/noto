import React, { Component } from "react"
import { Link} from "react-router-dom";

class BoardCard extends Component {

    render () {
        return (
            <div className="board-title"> 
            <div className="panel">
                <div className="board-body">
                    <h4><Link to ={ "/board/:key" + this.props.board.key}> {this.props.board.name} </Link></h4>
                </div>
            </div>
        </div>
        );
    }
}

export default BoardCard;