import React from 'react';
import { Link } from 'react-router';
import { shallow, mount } from 'enzyme';
import jsdom from 'mocha-jsdom';
import expect from 'expect';

import ContentTable from '../../components/content/ContentTable';

import { sampleRows } from './fixtures';

function setup(rows = sampleRows) {
  const actions = {
    deletePost: expect.createSpy()
  };

  let component = mount(
    <ContentTable
      contentType="posts"
      columns={["Title", "Category", "Tags", "Status"]}
      rows={rows}
      deleteContent={actions.deletePost} />
  );

  return {
    component: component,
    actions: actions,
    title: component.find(Link),
    thead: component.find('thead'),
    deleteButton: component.find('.row-actions a').first()
  };
}

describe('Components::ContentTable', () => {
  jsdom();

  it('should render correctly', () => {
    const { component, title, thead } = setup();
    const compProps = component.props();

    expect(thead.find('tr th').length).toBe(compProps.columns.length);
    let actual = '/collections/' + compProps.contentType + '/' + compProps.rows[0][0];
    expect(title.first().prop('to')).toEqual(actual);
  });

  it('should not render table when no rows provided', () => {
    const { component } = setup([]);
    const compProps = component.props();

    expect(component.find('table').node).toNotExist();

    const h1 = component.find('h1');
    expect(h1.text()).toBe(`You don\'t have any ${compProps.contentType}.`);
  });

  it('should not dispach deletePost when delete butten clicked', () => {
    const { actions, deleteButton, component } = setup();
    deleteButton.simulate('click');
    expect(component.props().deleteContent.calls.length).toBe(0); //TODO handle prompt
  });
});
