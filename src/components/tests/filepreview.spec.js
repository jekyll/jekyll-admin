import React from 'react';
import { mount } from 'enzyme';

import FilePreview from '../FilePreview';

import { staticfile } from './fixtures';

function setup(file=staticfile) {
  const actions = {
    onClickDelete: jest.fn()
  };

  let component = mount(
    <FilePreview file={file} {...actions} />
  );

  return {
    component,
    filename: component.find('.filename'),
    image: component.find('img'),
    div: component.find('.file-preview a div'),
    actions: actions
  };
}

describe('Components::FilePreview', () => {
  it('should render an image if the file has an image extension', () => {
    const { image, div } = setup();
    expect(image.node).toBeTruthy();
    expect(div.node).toBeFalsy();
  });
  it('should render a div if the file does not have an image extension', () => {
    const { image, div } = setup({...staticfile, extname: 'html'});
    expect(image.node).toBeFalsy();
    expect(div.node).toBeTruthy();
  });
});
