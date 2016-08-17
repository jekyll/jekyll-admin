import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { ADMIN_PREFIX } from './constants';

import App from './containers/App';
import Configuration from './containers/views/Configuration';
import Pages from './containers/views/Pages';
import PageEdit from './containers/views/PageEdit';
import PageNew from './containers/views/PageNew';
import Documents from './containers/views/Documents';
import DocumentEdit from './containers/views/DocumentEdit';
import DocumentNew from './containers/views/DocumentNew';
import DataFiles from './containers/views/DataFiles';
import DataFileEdit from './containers/views/DataFileEdit';
import DataFileNew from './containers/views/DataFileNew';
import StaticFiles from './containers/views/StaticFiles';
import NotFound from './containers/views/NotFound';

export default (
  <Route path={`${ADMIN_PREFIX}`} component={App}>
    <IndexRoute component={Pages}/>
    <Route path="configuration" component={Configuration} />
    <Route path="pages" component={Pages} />
    <Route path="pages/:id" component={PageEdit} />
    <Route path="page/new" component={PageNew} />
    <Route path="collections/:collection_name" component={Documents} />
    <Route path="collections/:collection_name/:id" component={DocumentEdit} />
    <Route path="collection/:collection_name/new" component={DocumentNew} /> // TODO check collection exists
    <Route path="datafiles" component={DataFiles} />
    <Route path="datafiles/:data_file" component={DataFileEdit} />
    <Route path="datafile/new" component={DataFileNew} />
    <Route path="staticfiles" component={StaticFiles} />
    <Route path={`${ADMIN_PREFIX}/*`} component={NotFound} />
  </Route>
);
