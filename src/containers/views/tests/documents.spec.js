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
    search: expect.createSpy()
  };

  const component = mount(
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
    h1: component.find('h1').last(),
    message: component.find('.message'),
    table: component.find('.content-table')
  };
}

describe('Containers::Documents', () => {
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Movies');
    expect(message.text()).toBe('');
  });

  it('should render correctly when there are not any documents', () => {
    const { component, table, h1 } = setup([]);
    const compProps = component.props();
    expect(table.node).toNotExist();
    expect(h1.text()).toBe(`No matching documents found.`);
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
