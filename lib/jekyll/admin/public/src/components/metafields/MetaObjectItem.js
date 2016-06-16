import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaObjectItem extends Component {

  constructor(props) {
    super(props);
  }

  convert(type) {
    this.setState({ currentType: type });
  }

  componentWillMount() {
    this.setState({ currentType: 'MetaSimple' });
  }

  render() {
    const { index, deleteItem } = this.props;

    const FieldTypes = { MetaArray, MetaObject, MetaSimple};
    const CurrentComponent = FieldTypes[this.state.currentType || 'MetaSimple'];
    return (
      <div className="object-item-wrap">
        <div className="object-key">
          <input className="field key-field" type="text" placeholder="key" />
          <MetaButtons
            onDeleteClick={deleteItem}
            onConvert={this.convert.bind(this)}
            currentType={this.state.currentType} />
        </div>
        <div className="object-value">
          <CurrentComponent />
        </div>
      </div>
    );
  }

}

MetaObjectItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default MetaObjectItem;
