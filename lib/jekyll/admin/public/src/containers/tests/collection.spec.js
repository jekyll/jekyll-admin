import React from 'react';
import { withRouter } from 'react-router';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Collection } from '../views/Collection';
import ContentTable from '../../components/ContentTable';

function setup() {
  const actions = {
    fetchCollections: expect.createSpy(),
    deleteDocument: expect.createSpy()
  };

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

  let component = shallow(
    <Collection
      collections={{movies: [collection]}}
      message=""
      {...actions}
      params={{collection_name: "movies"}} />
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

  it('should call fetchCollections action before mount', () => {
    const { actions } = setup();
    expect(actions.fetchCollections).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(["Title", "Collection", "Tags", "Status"]);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['the-revenant', 'The Revenant', 'movies', 'test', 'draft']
        ]);
      expect(contentTable.prop('contentType')).toBe('collections');
    });

    it('should not call deleteDocument', () => {
      const { actions } = setup();
      expect(actions.deleteDocument).toNotHaveBeenCalled();
    });
  });
});
