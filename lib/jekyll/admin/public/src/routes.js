import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Configuration from './containers/views/Configuration';
import Pages from './containers/views/Pages';
import PageEdit from './containers/views/PageEdit';
import PageNew from './containers/views/PageNew';
import Documents from './containers/views/Documents';
import DocumentEdit from './containers/views/DocumentEdit';
import DocumentNew from './containers/views/DocumentNew';

import NotFound from './containers/views/NotFound';

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Pages}/>
    <Route path="configuration" component={Configuration} />
    <Route path="pages" component={Pages} />
    <Route path="pages/:id" component={PageEdit} />
    <Route path="page/new" component={PageNew} />
    <Route path="collections/:collection_name" component={Documents} />
    <Route path="collections/:collection_name/:id" component={DocumentEdit} />
    <Route path="collection/:collection_name/new" component={DocumentNew} /> // check collection exists
    <Route path="/admin/*" component={NotFound} />
  </Route>
);
