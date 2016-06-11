import React from 'react';
import { withRouter } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Collection } from '../views/Collection';
import ContentTable from '../../components/content/ContentTable';

const collection = {
  "id": "the-revenant",
  "collection_name": "movies",
  "document_id": "the-revenant",
  "meta": {
    "layout": "default",
    "title": "The Revenant",
    "tags": "test",
    "status": "draft"
  }
};

function setup(currentDocuments=[collection]) {
  const actions = {
    fetchCollectionDocuments: expect.createSpy(),
    deleteCollectionDocument: expect.createSpy()
  };

  let component = shallow(
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
    h1: component.find('h1'),
    message: component.find('.message'),
    contentTable: component.find(ContentTable)
  };
}

describe('Containers::Collection', () => {
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Movies');
    expect(message.text()).toBe('');
  });

  it('should render no-docs-header when no docs provided', () => {
    const { component, contentTable, h1 } = setup([]);
    const compProps = component.props();
    expect(h1.text()).toBe("You don't have any documents.");
  });

  it('should call fetchCollectionDocuments action before mount', () => {
    const { actions } = setup();
    expect(actions.fetchCollectionDocuments).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(["Title", "Tags", "Status"]);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['the-revenant', 'The Revenant', 'test', 'draft']
        ]);
      expect(contentTable.prop('contentType')).toBe('movies');
    });

    it('should not call deleteDocument', () => {
      const { actions } = setup();
      expect(actions.deleteCollectionDocument).toNotHaveBeenCalled();
    });
  });
});
