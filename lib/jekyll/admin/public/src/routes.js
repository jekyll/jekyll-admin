import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/views/Home';
import Config from './containers/views/Configuration';

import Posts from './containers/views/Posts';
import PostEdit from './containers/views/PostEdit';
import PostNew from './containers/views/PostNew';

import Pages from './containers/views/Pages';
import PageEdit from './containers/views/PageEdit';
import PageNew from './containers/views/PageNew';

import Collection from './containers/views/Collection';
import CollectionEdit from './containers/views/CollectionEdit';
import CollectionNew from './containers/views/CollectionNew';

import NotFound from './containers/views/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/configuration" component={Config} />
    <Route path="/posts" component={Posts} />
    <Route path="/posts/:post" component={PostEdit} />
    <Route path="/post/new" component={PostNew} />
    <Route path="/pages" component={Pages} />
    <Route path="/pages/:page_id" component={PageEdit} />
    <Route path="/page/new" component={PageNew} />
    <Route path="/collections/:collection_name" component={Collection} />
    <Route path="/collections/:collection_name/:collection" component={CollectionEdit} />
    <Route path="/collection/new" component={CollectionNew} />
    <Route path="*" component={NotFound} />
  </Route>
);
