import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { DataFiles } from '../DataFiles';

import { datafile } from './fixtures';

function setup(datafiles=[datafile]) {
  const actions = {
    fetchDataFiles: expect.createSpy(),
    deleteDataFile: expect.createSpy(),
    search: expect.createSpy()
  };

  const component = mount(
    <DataFiles
      files={datafiles}
      isFetching={false}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    table: component.find('.content-table')
  };
}

describe('Containers::DataFiles', () => {
  it('should render correctly', () => {
    const { h1 } = setup();
    expect(h1.text()).toBe('Data Files');
  });

  it('should render correctly when there are not any data files', () => {
    const { component, table, h1 } = setup([]);
    const compProps = component.props();
    expect(table.node).toNotExist();
    expect(h1.text()).toBe(`You don't have any data files.`);
  });

  it('should call fetchDataFiles action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchDataFiles).toHaveBeenCalled();
  });
});
