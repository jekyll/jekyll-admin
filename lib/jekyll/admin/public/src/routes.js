import React from 'react';
import { Route, IndexRoute } from 'react-router';

require('./favicon.ico');

import App from './containers/App';
import Home from './containers/views/Home';
import Config from './containers/views/Configuration';
import Posts from './containers/views/Posts';
import PostEdit from './containers/views/PostEdit';
import Pages from './containers/views/Pages';
import Collections from './containers/views/Collections';
import NotFound from './containers/views/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/configuration" component={Config} />
    <Route path="/posts" component={Posts} />
    <Route path="/posts/:post" component={PostEdit} />
    <Route path="/pages" component={Pages} />
    <Route path="/collections" component={Collections} />
    <Route path="*" component={NotFound} />
  </Route>
);
