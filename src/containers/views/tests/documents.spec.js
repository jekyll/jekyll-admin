import React from 'react';
import { mount } from 'enzyme';
import { Documents } from '../Documents';

import { doc } from './fixtures';

function setup(documents = [doc]) {
  const actions = {
    fetchCollection: jest.fn(),
    deleteDocument: jest.fn(),
    search: jest.fn(),
  };

  const props = {
    documents,
    params: { collection_name: 'movies', splat: 'test' },
    isFetching: false,
  };

  const component = mount(<Documents {...actions} {...props} />);

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    new_button: component.find('.page-buttons a').first(),
    row_title: component.find('strong a'),
    table: component.find('.content-table'),
  };
}

describe('Containers::Documents', () => {
  it('should render correctly', () => {
    const { component, new_button } = setup();
    expect(new_button.text()).toBe('New document');
    component.setProps({ params: { collection_name: 'posts' } });
    expect(new_button.text()).toBe('New post');
  });

  it('should render correctly when there are not any documents', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No documents found.`);
  });

  it('should show filename if title is empty', () => {
    const { row_title } = setup([
      {
        ...doc,
        title: '',
      },
    ]);
    expect(row_title.text()).toBe(doc.name);
  });

  it('should call fetchDocuments action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchCollection).toHaveBeenCalled();
  });

  it('should fetch documents again when params change', () => {
    const { component, actions } = setup();
    component.setProps({ params: { collection_name: 'puppies' } });
    expect(actions.fetchCollection.mock.calls.length).toBe(2);
  });
});
