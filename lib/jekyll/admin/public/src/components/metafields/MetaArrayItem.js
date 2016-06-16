import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

export class MetaArrayItem extends Component {

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
    const { id, value, index, deleteItem } = this.props;

    const FieldTypes = { MetaArray, MetaObject, MetaSimple};
    const CurrentComponent = FieldTypes[this.state.currentType || 'MetaSimple'];
    return (
      <div className="array-item-wrap">
        <div className="array">
          <div className="array-header">
            <span className="array-field-num">{index+1}.</span>
            <MetaButtons
              onDeleteClick={deleteItem}
              onConvert={this.convert.bind(this)}
              currentType={this.state.currentType} />
          </div>
          <CurrentComponent />
        </div>
      </div>
    );
  }
}

MetaArrayItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  deleteItem: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MetaArrayItem;
