import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';

class CounterAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { icon, label, minHeight, count, children } = this.props;
    const { collapsed } = this.state;
    const accordionClasses = classnames('accordion-label', { collapsed });
    const panelHeight = collapsed ? minHeight : (count + 1) * minHeight;

    return (
      <li
        className={accordionClasses}
        style={{ maxHeight: panelHeight }}
        onClick={this.handleClick}
      >
        <a>
          {icon && <Icon name={icon} />}
          {label}
          <div className="counter">{count}</div>
          <div className="chevrons">
            <Icon name="chevron-up" />
          </div>
        </a>
        {children}
      </li>
    );
  }
}

CounterAccordion.propTypes = {
  minHeight: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default CounterAccordion;
