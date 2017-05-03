import React from 'react';
import { mount } from 'enzyme';

import { StaticFiles } from '../StaticFiles';

import { staticfile } from './fixtures';

function setup(files=[staticfile]) {
  const actions = {
    fetchStaticFiles: jest.fn(),
    uploadStaticFiles: jest.fn(),
    deleteStaticFile: jest.fn(),
    search: jest.fn()
  };

  const component = mount(
    <StaticFiles
      files={files}
      isFetching={false}
      {...actions} />
  );

  return {
    component: component,
    actions: actions,
    h1: component.find('h1').last(),
    info: component.find('.preview-info'),
    previewContainer: component.find('.preview-container')
  };
}

describe('Containers::StaticFiles', () => {
  it('should render correctly', () => {
    const { h1, info, previewContainer } = setup();
    expect(h1.text()).toBe('Static Files');
    expect(info.node).toBeFalsy();
    expect(previewContainer.node).toBeTruthy();
  });

  it('should render correctly when there are not any files', () => {
    const { info, previewContainer } = setup([]);
    expect(info.node).toBeTruthy();
    expect(previewContainer.node).toBeFalsy();
  });

  it('should call fetchStaticFiles action after mounted', () => {
    const { actions } = setup();
    expect(actions.fetchStaticFiles).toHaveBeenCalled();
  });
});
