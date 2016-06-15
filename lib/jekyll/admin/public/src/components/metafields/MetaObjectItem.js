import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

const FieldTypes = { MetaArray, MetaObject, MetaSimple};

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const itemTarget = {
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
    props.moveItem(dragIndex, hoverIndex);
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
    const { connectDragSource, connectDropTarget,
            connectDragPreview, isDragging,
            index, deleteItem } = this.props;

    const FieldTypes = { MetaArray, MetaObject, MetaSimple};
    const CurrentComponent = FieldTypes[this.state.currentType || 'MetaSimple'];
    return connectDragPreview(connectDropTarget(
      <div className={"object-item-wrap " + (isDragging ? 'dragging':'')}>
        <div className="object-key">
          <input className="field key-field" type="text" placeholder="key" />
          <MetaButtons
            onDeleteClick={deleteItem}
            onConvert={this.convert.bind(this)}
            currentType={this.state.currentType}
            ref={instance => {
              if (instance != null) {
                connectDragSource(findDOMNode(instance.refs.move))
              }
            }}/>
        </div>
        <div className="object-value">
          <CurrentComponent />
        </div>
      </div>
    ));
  }

}

MetaObjectItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

export default DragSource('MetaObjectItem', itemSource, collectSource)(
  DropTarget('MetaObjectItem', itemTarget, collectTarget)(MetaObjectItem)
);
