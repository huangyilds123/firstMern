import React, { Component } from 'react'
import { Container } from 'reactstrap';


import { connect } from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/itemAction'

import ShoppingItem from './ShoppingItem';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    addNewItem = () => {
        const name = prompt('Name:')
        const newItem = {
            name
        }
        this.props.addItem(newItem);

    }


    render() {
        const { items } = this.props.item;

        return (
            <div>
                <button className="btn btn-success" onClick={this.addNewItem}>
                    Add
                </button>
                <ul className="list-group">
                    {items.map(item =>
                        <ShoppingItem key={item._id} item={item} />
                    )}
                </ul>
            </div>
        )

    }
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList)
