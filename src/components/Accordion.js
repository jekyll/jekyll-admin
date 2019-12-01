import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';

class Accordion extends Component {
  state = { collapsed: true };

  handleClick = () => {
    this.setState(state => {
      return {
        collapsed: !state.collapsed,
      };
    });
  };

  renderIndicator() {
    const { counter, count } = this.props;
    const { collapsed } = this.state;

    if (collapsed) {
      if (counter) return <div className="counter">{count}</div>;
      return (
        <div className="chevrons">
          <Icon name="chevron-down" />
        </div>
      );
    }
    return (
      <div className="chevrons">
        <Icon name="chevron-up" />
      </div>
    );
  }

  render() {
    const { icon, label, minHeight, count, counter, children } = this.props;
    const { collapsed } = this.state;
    const accordionClasses = classnames('accordion', { collapsed });
    const panelHeight = collapsed ? minHeight : (count + 1) * minHeight;

    return (
      <div
        className={accordionClasses}
        style={{ maxHeight: panelHeight }}
        onClick={this.handleClick}
      >
        <div className="accordion-label">
          {icon && <Icon name={icon} />}
          {label}
          <div className="indicator">{this.renderIndicator()}</div>
        </div>
        {children}
      </div>
    );
  }
}

Accordion.propTypes = {
  minHeight: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  counter: PropTypes.bool,
  icon: PropTypes.string,
};

export default Accordion;
