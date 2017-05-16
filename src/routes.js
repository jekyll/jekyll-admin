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
    <Route path="pages">
      <IndexRoute component={Pages} />
      <Route path="(**/)new" component={PageNew} />
      <Route path="(**/)*.*" component={PageEdit} />
      <Route path="**" component={Pages} />
    </Route>
    <Route path="collections">
      <Route path=":collection_name">
        <IndexRoute component={Documents} />
        <Route path="(**/)new" component={DocumentNew} />
        <Route path="(**/)*.*" component={DocumentEdit} />
        <Route path="**" component={Documents} />
      </Route>
    </Route>
    <Route path="datafiles">
      <IndexRoute component={DataFiles} />
      <Route path="(**/)new" component={DataFileNew} />
      <Route path="(**/)*.*" component={DataFileEdit} />
      <Route path="**" component={DataFiles} />
    </Route>
    <Route path="staticfiles" component={StaticFiles} />
    <Route path={`${ADMIN_PREFIX}/*`} component={NotFound} />
  </Route>
);
