import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';

// Components
import MetaField from '../components/metadata/MetaField';

// Actions
import {
  storeContentFields, addField, removeField, updateFieldKey, updateFieldValue,
  moveArrayItem, convertField
} from '../actions/metadata';

export class MetaFields extends Component {

  componentDidMount() {
    const { storeContentFields, content } = this.props;
    storeContentFields(content);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metadata !== this.props.metadata;
  }

  render() {
    const { metadata, addField, removeField, updateFieldKey,
      updateFieldValue, moveArrayItem, convertField, key_prefix } = this.props;

    const { name, title, content, dir, url, path, ...rest } = metadata;

    let fields = _.map(rest, (field, key) => {
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
  content: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  key_prefix: PropTypes.string.isRequired,
  storeContentFields: PropTypes.func.isRequired,
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
    storeContentFields,
    addField,
    removeField,
    updateFieldKey,
    updateFieldValue,
    moveArrayItem,
    convertField
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaFields);
