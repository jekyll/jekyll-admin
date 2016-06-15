import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import MetaField from './MetaField';

export class MetaFields extends Component {

  constructor(props) {
    super(props);
    this.moveField = this.moveField.bind(this);
    this.state = {
      fields: [],
      count: 0
    };
  }

  addField() {
    const { fields, count } = this.state;
    this.setState({ fields : [...fields, { id: count + 1, value: '' }], count: count+1});
  }

  deleteField(index) {
    const { fields } = this.state;
    this.setState({ fields :
      [
        ...fields.slice(0, index),
        ...fields.slice(index + 1)
      ]
    });
  }

  moveField(dragIndex, hoverIndex) {
    const { fields } = this.state;
    const dragField = fields[dragIndex];

    this.setState(update(this.state, {
      fields: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragField]
        ]
      }
    }));
  }

  getTree() {

  }

  render() {
    const { fields } = this.state;
    return (
      <div className="metafields">
        {fields.map((field, i) => {
          return (
            <MetaField key={field.id}
              index={i}
              id={field.id}
              moveField={this.moveField}
              field={field.value}
              deleteField={this.deleteField.bind(this, i)} />
          );
        })}

        <div className="meta-new">
          <a onClick={() => this.addField()}><i className="fa fa-plus-circle"></i>New metadata field</a>
        </div>
      </div>
    );
  }

}

export default DragDropContext(HTML5Backend)(MetaFields);
