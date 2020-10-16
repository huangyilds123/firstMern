import React, { Component } from 'react';


import AppNavbar from './component/AppNavbar'
import ShoppingList from './component/ShoppingList'
import ShoppingItem from './component/ShoppingItem'

// import Posts from './component/Posts'
// import PostForm from './component/PostForm'

import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { loadUser } from './actions/authActions'

import store from './store';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <ShoppingList />
        </div>

      </Provider>
    );
  }

}

export default App;
