import React from 'react';
import { withRouter } from 'react-router';
import { mount } from 'enzyme';
import expect from 'expect';
import { Documents } from '../Documents';

import { doc } from './fixtures';

function setup(currentDocuments=[doc]) {
  const actions = {
    fetchDocuments: expect.createSpy(),
    deleteDocument: expect.createSpy(),
    searchByTitle: expect.createSpy()
  };

  let component = mount(
    <Documents
      currentDocuments={currentDocuments}
      message=""
      {...actions}
      params={{collection_name: "movies"}}
      isFetching={false} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1'),
    message: component.find('.message')
  };
}

describe('Containers::Documents', () => {
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Movies');
    expect(message.text()).toBe('');
  });

  it('should render no-docs-header when no docs provided', () => {
    const { component, h1 } = setup([]);
    const compProps = component.props();
    expect(h1.text()).toBe(`You don't have any documents for this collection.`);
  });

  it('should call fetchDocuments action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDocuments).toHaveBeenCalled();
  });

  it('should fetch documents again when params change', () => {
    const { component, actions } = setup();
    component.setProps({params: {collection_name: "puppies"}});
    expect(actions.fetchDocuments.calls.length).toBe(2);
  });
});
