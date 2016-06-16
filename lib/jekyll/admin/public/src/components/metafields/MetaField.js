import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaField extends Component {

  constructor(props) {
    super(props);
    this.state = { currentType: 'MetaSimple' };
  }

  convert(type) {
    this.setState({ currentType: type });
  }

  render() {
    const { index, field, deleteField } = this.props;
    const FieldTypes = { MetaArray, MetaObject, MetaSimple};
    const CurrentComponent = FieldTypes[this.state.currentType];
    return (
      <div className="metafield">
        <div className="meta-key">
          <input defaultValue={field} className="field key-field" type="text" placeholder="Key" />
          <MetaButtons
            onDeleteClick={deleteField}
            onConvert={this.convert.bind(this)}
            currentType={this.state.currentType} />
        </div>
        <CurrentComponent />
      </div>
    );
  }
}

MetaField.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteField: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired
};

export default MetaField;
