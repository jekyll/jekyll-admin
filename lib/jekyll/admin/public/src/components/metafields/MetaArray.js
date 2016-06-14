import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';

import MetaArrayItem from './MetaArrayItem';

export class MetaArray extends Component {

  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.state = {
      items: [{
          id: 1,
          text: 'Write a cool JS library'
        }, {
          id: 2,
          text: 'Make it generic enough'
        },
        {
          id:3 ,
          text: 'Make it generic enough'
        }
      ]
    };
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
      <div className="meta-value-array sortable">
        {items.map((item, i) => {
          return (
            <MetaArrayItem key={item.id}
              index={i}
              id={item.id}
              moveItem={this.moveItem} />
          );
        })}
        <a onClick={() => this.handleAddClick()} className="add-field-array" title="Add new list item">
          <i className="fa fa-plus"></i>
        </a>
      </div>
    );
  }

}

export default MetaArray;
