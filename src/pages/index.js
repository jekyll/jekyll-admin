import React from 'react';
import { asyncComponent } from 'react-async-component';

export const PageList = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure([], require => resolve(require('./PageList')), 'PageList')
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

export const DocumentList = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => resolve(require('./DocumentList')),
        'DocumentList'
      )
    ),
  LoadingComponent: () => <div>Loading</div>,
  ErrorComponent: () => <div>Error</div>,
});

export const DocumentSingle = asyncComponent({
  resolve: () =>
    new Promise(resolve =>
      require.ensure(
        [],
        require => resolve(require('./DocumentSingle')),
        'DocumentSingle'
      )
    ),
  LoadingComponent: () => <div>Loading</div>,
  ErrorComponent: () => <div>Error</div>,
});
