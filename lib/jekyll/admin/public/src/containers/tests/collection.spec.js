import React from 'react';
import { withRouter } from 'react-router';
import { mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import { Collection } from '../views/Collection';
import ContentTable from '../../components/content/ContentTable';

import { collection } from './fixtures';

function setup(currentDocuments=[collection]) {
  const actions = {
    fetchDocuments: expect.createSpy(),
    deleteDocument: expect.createSpy(),
    searchByTitle: expect.createSpy()
  };

  let component = mount(
    <Collection
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
    contentTable: component.find(ContentTable)
  };
}

describe('Containers::Collection', () => {
  jsdom();
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Movies');
    expect(message.text()).toBe('');
  });

  it('should render no-docs-header when no docs provided', () => {
    const { component, contentTable, h1 } = setup([]);
    const compProps = component.props();
    expect(h1.text()).toBe(`You don't have any movies.`);
  });

  it('should call fetchDocuments action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDocuments).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(["Title", "Categories", "Tags", "Status"]);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['the-revenant', 'The Revenant', 'movie', 'test', 'draft']
        ]);
      expect(contentTable.prop('contentType')).toBe('movies');
    });

    it('should not call deleteDocument', () => {
      const { actions } = setup();
      expect(actions.deleteDocument).toNotHaveBeenCalled();
    });
  });

  it('should fetch documents again when params change', () => {
    // TODO
  });
});
