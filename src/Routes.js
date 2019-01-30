import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import UpdateItem from './components/UpdateItem';

const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/item/:id" component={UpdateItem} />
        </Switch>
    </Router>
);

export default routes;
