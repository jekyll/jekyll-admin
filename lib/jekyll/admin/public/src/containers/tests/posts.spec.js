import React from 'react';
import { shallow, mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import { Posts } from '../views/Posts';
import ContentTable from '../../components/ContentTable';

const post = {
  'id': 'testing-posts',
  'collection_name': 'posts',
  'document_id': 'testing-posts',
  'meta': {
    'layout': 'post',
    'title': 'Testing Posts',
    'date': '2016-05-20 01:10:46 +0300',
    'categories': 'test',
    'tags': 'test, post',
    'status': 'published'
  }
};

function setup(posts = [post]) {
  const actions = {
    fetchCollections: expect.createSpy(),
    deleteDocument: expect.createSpy()
  };

  let component = mount(
    <Posts
      collections={{posts: posts}}
      message=""
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    message: component.find('.message'),
    contentTable: component.find(ContentTable)
  };
}

describe('Containers::Posts', () => {
  jsdom();

  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Posts');
    expect(message.text()).toBe('');
  });

  it('should render no-post-header when no posts provided', () => {
    const { component, contentTable, h1 } = setup([]);
    const compProps = component.props();
    expect(h1.text()).toBe("You don't have any posts.");
  });

  it('should call fetchCollections action before mount', () => {
    const { actions } = setup();
    expect(actions.fetchCollections).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(['Title', 'Category', 'Tags', 'Status']);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['testing-posts', 'Testing Posts', 'test', 'test, post', 'published']
        ]);
      expect(contentTable.prop('contentType')).toBe('posts');
    });

    it('should not call deleteDocument', () => {
      const { actions } = setup();
      expect(actions.deleteDocument).toNotHaveBeenCalled();
    });
  });
});
