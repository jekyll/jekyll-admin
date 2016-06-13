import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Configuration from './containers/views/Configuration';
import Pages from './containers/views/Pages';
import PageEdit from './containers/views/PageEdit';
import PageNew from './containers/views/PageNew';
import Collection from './containers/views/Collection';
import CollectionEdit from './containers/views/CollectionEdit';
import CollectionNew from './containers/views/CollectionNew';

import NotFound from './containers/views/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Pages}/>
    <Route path="/configuration" component={Configuration} />
    <Route path="/pages" component={Pages} />
    <Route path="/pages/:page_id" component={PageEdit} />
    <Route path="/page/new" component={PageNew} />
    <Route path="/collections/:collection_name" component={Collection} />
    <Route path="/collections/:collection_name/:document_id" component={CollectionEdit} />
    <Route path="/collection/:collection_name/new" component={CollectionNew} /> // check collection exists
    <Route path="*" component={NotFound} />
  </Route>
);
