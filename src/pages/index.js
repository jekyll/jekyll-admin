import React from 'react';
import { asyncComponent } from 'react-async-component';

export const Pages = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure([], require => resolve(require('./Pages')), 'Pages')
    ),
  LoadingComponent: () => <div>Loading</div>,
  ErrorComponent: () => <div>Error</div>,
});

export const PageSingle = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => resolve(require('./PageSingle')),
        'PageSingle'
      )
    ),
  LoadingComponent: () => <div>Loading</div>,
  ErrorComponent: () => <div>Error</div>,
});
