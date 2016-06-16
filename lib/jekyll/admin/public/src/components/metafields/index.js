import React, { Component, PropTypes } from 'react';
import Sortable from 'sortablejs';

import MetaField from './MetaField';

export class MetaFields extends Component {

  constructor(props) {
    super(props);
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

  getTree() {

  }

  sortableGroupDecorator = (component) => {
    if (component) {
      let options = {
        draggable: ".metafield",
        group: "meta-fields",
        handle: ".move",
        onEnd: (evt) => {
          console.log(evt.newIndex);
        }
      };
      Sortable.create(component, options);
    }
  };

  render() {
    const { fields } = this.state;
    return (
      <div className="metafields" ref={this.sortableGroupDecorator}>
        {fields.map((field, i) => {
          return (
            <MetaField key={field.id}
              index={i}
              id={field.id}
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

export default MetaFields;
