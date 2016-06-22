import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import { Pages } from '../views/Pages';
import ContentTable from '../../components/content/ContentTable';

import { page } from './fixtures';

function setup() {
  const actions = {
    fetchPages: expect.createSpy(),
    deletePage: expect.createSpy(),
    searchByTitle: expect.createSpy()
  };

  let component = mount(
    <Pages
      pages={[page]}
      message=""
      isFetching={false}
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

  it('should call fetchPages action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchPages).toHaveBeenCalled();
  });

  describe('<ContentTable />', () => {
    it('should render ContentTable component', () => {
      const { contentTable } = setup();
      expect(contentTable.prop('columns'))
        .toEqual(["Title", "Permalink", "Status"]);
      expect(contentTable.prop('rows'))
        .toEqual([
          ['about', 'About', '/about/', 'published']
        ]);
      expect(contentTable.prop('contentType')).toBe('pages');
    });

    it('should not call deletePage', () => {
      const { actions } = setup();
      expect(actions.deletePage).toNotHaveBeenCalled();
    });
  });

});
