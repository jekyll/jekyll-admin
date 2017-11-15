import React from 'react';
import { asyncComponent } from 'react-async-component';

export const Dashboard = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => resolve(require('./Dashboard.js')),
        'Dashboard'
      )
    ),
  LoadingComponent: () => <div>Loading</div>,
  ErrorComponent: () => <div>Error</div>
});
