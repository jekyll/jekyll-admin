import React, { Component, PropTypes } from 'react';
import Sortable from 'sortablejs';

import MetaArrayItem from './MetaArrayItem';

export class MetaArray extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{ id: 0, value: ''}],
      count : 0
    };
  }

  addItem() {
    const { items, count } = this.state;
    this.setState({ items : [...items, { id: count + 1, value: '' }], count: count+1});
  }

  deleteItem(index) {
    const { items } = this.state;
    this.setState({ items :
      [
        ...items.slice(0, index),
        ...items.slice(index + 1)
      ]
    });
  }

  sortableGroupDecorator = (component) => {
    if (component) {
      let options = {
        draggable: ".array-item-wrap",
        group: "meta-array-items",
        handle: ".move",
        onEnd: (evt) => {
          console.log(evt.newIndex);
        }
      };
      Sortable.create(component, options);
    }
  };

  render() {
    const { items } = this.state;
    return (
      <div className="meta-value-array sortable" ref={this.sortableGroupDecorator}>
        {items.map((item, i) => {
          return (
            <MetaArrayItem key={item.id}
              index={i}
              id={item.id}
              value={item.value}
              deleteItem={this.deleteItem.bind(this, i)} />
          );
        })}
        <a onClick={() => this.addItem()} className="add-field-array" title="Add new list item">
          <i className="fa fa-plus"></i>
        </a>
      </div>
    );
  }

}

export default MetaArray;
