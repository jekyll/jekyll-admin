import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import Splitter from './Splitter';
import Errors from './Errors';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import InputPath from './form/InputPath';
import InputTitle from './form/InputTitle';
import MarkdownEditor from './MarkdownEditor';
import StaticMetaData from './metadata/StaticMetaFields';
import Metadata from '../containers/MetaFields';
import { injectDefaultFields as defaultFields } from '../utils/metadata';

export default function CreateMarkdownPage({
  type,
  config,
  errors,
  updated,
  updateBody,
  updatePath,
  updateTitle,
  fieldChanged,
  onClickSave,
  params: { splat },
}) {
  const metaType = type === 'drafts' ? 'posts' : type;

  return (
    <HotKeys handlers={{ save: onClickSave }}>
      {errors.length > 0 && <Errors errors={errors} />}

      <div className="content-header">
        <Breadcrumbs type={type} splat={splat} />
      </div>

      <div className="content-wrapper">
        <div className="content-body">
          <InputPath onChange={updatePath} type={type} path="" />
          <InputTitle onChange={updateTitle} title="" />
          <MarkdownEditor
            onChange={updateBody}
            onSave={onClickSave}
            placeholder="Body"
            initialValue=""
          />
          <Splitter />
          <StaticMetaData fields={defaultFields(config, splat, metaType)} />
          <Metadata fields={{}} />
        </div>

        <div className="content-side">
          <Button
            onClick={onClickSave}
            type="create"
            active={fieldChanged}
            triggered={updated}
            block
          />
        </div>
      </div>
    </HotKeys>
  );
}

CreateMarkdownPage.propTypes = {
  type: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  updated: PropTypes.bool.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
};
