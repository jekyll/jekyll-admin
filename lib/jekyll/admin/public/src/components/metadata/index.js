import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Components
import MetaField from './MetaField';

// Actions
import {
  addField, removeField, setupMetadata, updateFieldKey, updateFieldValue,
  moveArrayItem, convertField
} from '../../actions/metadata';

export class MetaFields extends Component {

  componentWillMount() {
    const { setupMetadata, meta } = this.props;
    setupMetadata(meta);
  }

  render() {
    const { metadata, addField, removeField, updateFieldKey,
      updateFieldValue, moveArrayItem, convertField, key_prefix } = this.props;

    let fields = _.map(metadata, (field, key) => {
      let type = "simple";
      if (_.isObject(field)) type = "object";
      if (_.isArray(field)) type = "array";
      return (
        <MetaField
          key={key}
          key_prefix={key_prefix}
          type={type}
          parentType="top"
          fieldKey={key}
          fieldValue={field}
          addField={addField}
          removeField={removeField}
          updateFieldKey={updateFieldKey}
          updateFieldValue={updateFieldValue}
          moveArrayItem={moveArrayItem}
          convertField={convertField}
          nameAttr={`metadata['${key}']`}
          namePrefix={`metadata`} />
      );
    });

    return (
      <div className="metafields">
        {fields}
        <div className="meta-new">
          <a onClick={() => addField('metadata')}><i className="fa fa-plus-circle"></i>New metadata field</a>
        </div>
      </div>
    );
  }

}

MetaFields.propTypes = {
  meta: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  key_prefix: PropTypes.string.isRequired,
  setupMetadata: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  updateFieldKey: PropTypes.func.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
  moveArrayItem: PropTypes.func.isRequired,
  convertField: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { metadata } = state;
  return {
    metadata: metadata.metadata,
    key_prefix: metadata.key_prefix
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setupMetadata,
    addField,
    removeField,
    updateFieldKey,
    updateFieldValue,
    moveArrayItem,
    convertField
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaFields);
