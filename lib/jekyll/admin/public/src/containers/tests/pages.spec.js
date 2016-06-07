import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Pages } from '../views/Pages';
import ContentTable from '../../components/ContentTable';

function setup() {
  const actions = {
    fetchPages: expect.createSpy(),
    deletePage: expect.createSpy()
  };

  const page = {
    "id": "about",
    "page_id": "about",
    "meta": {
      "layout": "page",
      "title": "About",
      "permalink": "/about/",
      "status": "published"
    }
  };

  let component = shallow(
    <Pages
      pages={[page]}
      message=""
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1'),
    message: component.find('.message'),
    contentTable: component.find(ContentTable)
  };
}

describe('Containers::Pages', () => {
  it('should render correctly', () => {
    const { h1, message } = setup();
    expect(h1.text()).toBe('Pages');
    expect(message.text()).toBe('');
  });

  it('should call fetchPages action before mount', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(["Title", "Page ID", "Permalink", "Status"]);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['about', 'About', 'about', '/about/', 'published']
        ]);
      expect(contentTable.prop('contentType')).toBe('pages');
    });

    it('should not call deletePage', () => {
      const { actions } = setup();
      expect(actions.deletePage).toNotHaveBeenCalled();
    });
  });

});
