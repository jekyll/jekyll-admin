import React, { Component, PropTypes } from 'react';
import Sortable from 'sortablejs';

import MetaObjectItem from './MetaObjectItem';

export class MetaObject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [{ id: 0, value: ''}],
      count: 0
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
        draggable: ".object-item-wrap",
        group: "meta-object-items",
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
      <div className="meta-value-object sortable" ref={this.sortableGroupDecorator}>
        {items.map((item, i) => {
          return (
            <MetaObjectItem key={item.id}
              index={i}
              id={item.id}
              deleteItem={this.deleteItem.bind(this, i)} />
          );
        })}
        <a onClick={() => this.addItem()} className="add-field-object" title="Add new key/value pair">
          New key/value pair
        </a>
      </div>
    );
  }

}

export default MetaObject;
