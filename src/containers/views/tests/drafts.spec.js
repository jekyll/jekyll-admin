import React from 'react';
import { mount } from 'enzyme';

import Button from '../../../components/Button';
import { Drafts } from '../Drafts';
import { draft } from './fixtures';

function setup(drafts=[draft]) {
  const actions = {
    fetchDrafts: jest.fn(),
    deleteDraft: jest.fn(),
    search: jest.fn()
  };

  const component = mount(
    <Drafts
      drafts={drafts}
      isFetching={false}
      params={{ splat: 'draft-dir' }}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    table: component.find('.content-table'),
    deleteButton: component.find(Button).first()
  };
}

describe('Containers::Drafts', () => {
  it('should render correctly', () => {
    const { h1 } = setup();
    expect(h1.node).toBeFalsy();
  });

  it('should render correctly when there are no drafts', () => {
    const { table, h1 } = setup([]);
    expect(table.node).toBeFalsy();
    expect(h1.text()).toBe(`No drafts found.`);
  });

  it('should call fetchDrafts action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDrafts).toHaveBeenCalled();
  });

  it('should call fetchDrafts action after props change', () => {
    const { component, actions } = setup();
    expect(actions.fetchDrafts).toHaveBeenCalled();
    component.setProps({ params: { splat: 'draft-dir' }});
    expect(actions.fetchDrafts).toHaveBeenCalled();
    component.setProps({ params: { splat: 'draft-dir, foo' }});
    expect(actions.fetchDrafts).toHaveBeenCalled();
  });

  it('should call deleteDraft', () => {
    const { deleteButton, actions } = setup();
    deleteButton.simulate('click');
    expect(actions.deleteDraft).not.toHaveBeenCalled(); // TODO pass prompt
  });
});
