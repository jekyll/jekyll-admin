import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsedPanel: true };
  }

  handleClick = () => {
    this.setState({
      collapsedPanel: !this.state.collapsedPanel,
    });
  };

  render() {
    const { icon, label, type, itemHeight, itemsCount, children } = this.props;
    const { collapsedPanel } = this.state;
    const accordionClasses = classnames('accordion-label', {
      collapsed: collapsedPanel,
    });

    const panelHeight = collapsedPanel
      ? itemHeight
      : (itemsCount + 1) * itemHeight;
    const elemProps = {
      className: accordionClasses,
      style: { maxHeight: panelHeight },
      onClick: this.handleClick,
    };

    if (type === 'list-item') {
      return (
        <li {...elemProps}>
          <a>
            <i className={`fa fa-${icon}`} />
            {label}
            <div className="counter">{itemsCount}</div>
            <div className="chevrons">
              <i className="fa fa-chevron-up" />
            </div>
          </a>
          {children}
        </li>
      );
    } else {
      return (
        <div {...elemProps}>
          <div>
            <i className={`fa fa-${icon}`} />
            {label}
            <div className="counter">{itemsCount}</div>
            <div className="chevrons">
              <i className="fa fa-chevron-up" />
            </div>
          </div>
          {children}
        </div>
      );
    }
  }
}

Accordion.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default Accordion;
