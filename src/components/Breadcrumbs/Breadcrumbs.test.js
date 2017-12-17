import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs root="pages" splat="folders/test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
