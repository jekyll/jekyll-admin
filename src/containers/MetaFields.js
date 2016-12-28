import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import MetaField from '../components/metadata/MetaField';
import {
  storeContentFields, addField, removeField, updateFieldKey, updateFieldValue,
  moveArrayItem, convertField
} from '../actions/metadata';

export class MetaFields extends Component {

  componentDidMount() {
    const { storeContentFields, fields } = this.props;
    storeContentFields(fields);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metadata !== this.props.metadata;
  }

  render() {
    const { metadata, addField, removeField, updateFieldKey,
      updateFieldValue, moveArrayItem, convertField, key_prefix } = this.props;

    const { path, title, raw_content, ...rest } = metadata;

    const metafields = _.map(rest, (field, key) => {
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
        {metafields}
        <div className="meta-new">
          <a onClick={() => addField('metadata')}><i className="fa fa-plus-circle"></i>New metadata field</a>
        </div>
      </div>
    );
  }
}

MetaFields.propTypes = {
  fields: PropTypes.object.isRequired,
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

const mapStateToProps = (state) => ({
  metadata: state.metadata.metadata,
  key_prefix: state.metadata.key_prefix
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  storeContentFields,
  addField,
  removeField,
  updateFieldKey,
  updateFieldValue,
  moveArrayItem,
  convertField
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MetaFields);
