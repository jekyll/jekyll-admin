import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';

import MetaObjectItem from './MetaObjectItem';

export class MetaObject extends Component {

  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
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

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }));
  }

  render() {
    const { items } = this.state;
    return (
      <div className="meta-value-object sortable">
        {items.map((item, i) => {
          return (
            <MetaObjectItem key={item.id}
              index={i}
              id={item.id}
              moveItem={this.moveItem}
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
