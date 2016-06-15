import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import MetaArray from './MetaArray';
import MetaObject from './MetaObject';
import MetaSimple from './MetaSimple';
import MetaButtons from './MetaButtons';

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
    const { connectDragSource, connectDropTarget,
            connectDragPreview, isDragging,
            id, value, index, deleteItem } = this.props;

    const FieldTypes = { MetaArray, MetaObject, MetaSimple};
    const CurrentComponent = FieldTypes[this.state.currentType || 'MetaSimple'];
    return connectDragPreview(connectDropTarget(
      <div className="array-item-wrap">
        <div className={"array " + (isDragging ? 'dragging':'')}>
          <div className="array-header">
            <span className="array-field-num">{id+1}.</span>
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
          <CurrentComponent />
        </div>
      </div>
    ));
  }
}

MetaArrayItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default DragSource('MetaArrayItem', itemSource, collectSource)(
  DropTarget('MetaArrayItem', itemTarget, collectTarget)(MetaArrayItem)
);
