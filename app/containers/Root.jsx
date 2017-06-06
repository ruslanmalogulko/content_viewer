import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import configureStore from '../configureStore';
import App from './App';
import Content from '../components/Content';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Redirect from="/" to="/products" />
                <Route path="/" component={App}>
                    <Redirect from="/:menu" to="/:menu/general" />
                    <Route path='/:menu'>
                        <Route path='/:menu/:tab' component={Content} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    );
  }
}
