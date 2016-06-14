import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

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

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export class MetaArrayItem extends Component {

  render() {
    const { connectDragSource, connectDropTarget, connectDragPreview, isDragging, index } = this.props;
    return connectDragPreview(connectDropTarget(
      <div className="array-item-wrap">
        <div className={"array " + (isDragging ? 'dragging':'')}>
          <div className="array-header">
            <span className="array-field-num">{this.props.index}.</span>
            <div className="meta-buttons">
              {
                connectDragSource(
                  <span className="meta-button move"><i className="fa fa-arrows"></i></span>
                )
              }
              <span className="dropdown">
                <button className="meta-button"><i className="fa fa-ellipsis-h "></i></button>
                <div ref="dropdown" className="dropdown-wrap hidden">
                  <span><i className="fa fa-list-ol"></i>Convert to List</span>
                  <span><i className="fa fa-th-large"></i>Convert to Object</span>
                  <span className="remove-field"><i className="fa fa-trash"></i>Remove field</span>
                </div>
              </span>
            </div>
          </div>
          <div className="meta-value">
            <textarea className="field value-field" rows="1" placeholder="Value" />
          </div>
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
  moveItem: PropTypes.func.isRequired
};

export default DragSource('MetaArrayItem', itemSource, collectSource)(
  DropTarget('MetaArrayItem', itemTarget, collectTarget)(MetaArrayItem)
);
