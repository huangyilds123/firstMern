import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemAction'

export class ShoppingItem extends Component {
    delete = (id) => {
        this.props.deleteItem(id)
    }
    render() {
        const { name, _id } = this.props.item;
        return (
            <div>
                <li className="list-group-item">
                    <span>
                        <button
                            className="btn btn-danger"
                            onClick={this.delete.bind(this, _id)}>x</button>
                    </span>
                    {name}
                </li>
            </div>
        )
    }
}



export default connect(null, { getItems, deleteItem })(ShoppingItem)



