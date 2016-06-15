import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

const FieldTypes = { MetaArray, MetaObject, MetaSimple};

const fieldSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const fieldTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    if (!monitor.isOver({shallow: false})) return

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveField(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget()
});

export class MetaField extends Component {

  constructor(props) {
    super(props);
    this.state = { currentType: 'MetaSimple' };
  }

  convert(type) {
    this.setState({ currentType: type });
  }

  render() {
    const { connectDragSource, connectDropTarget,
      connectDragPreview, isDragging,
      index, field, deleteField } = this.props;

    const CurrentComponent = FieldTypes[this.state.currentType];
    return connectDragPreview(connectDropTarget(
      <div className={"metafield " + (isDragging ? 'dragging':'')} >
        <div className="meta-key">
          <input defaultValue={field} className="field key-field" type="text" placeholder="Key" />
          <MetaButtons
            onDeleteClick={deleteField}
            onConvert={this.convert.bind(this)}
            currentType={this.state.currentType}
            ref={instance => {
              if (instance != null) {
                connectDragSource(findDOMNode(instance.refs.move))
              }
            }}/>
        </div>
        <CurrentComponent />
      </div>
    ));
  }
}

MetaField.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveField: PropTypes.func.isRequired,
  deleteField: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired
};


export default DragSource('MetaField', fieldSource, collectSource)(
  DropTarget('MetaField', fieldTarget, collectTarget)(MetaField)
);
