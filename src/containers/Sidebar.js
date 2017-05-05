import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ADMIN_PREFIX } from '../constants';
import Splitter from '../components/Splitter';
import { fetchCollections } from '../actions/collections';
import { capitalize } from '../utils/helpers';
import { sidebar } from '../constants/lang';
import _ from 'underscore';

export class Sidebar extends Component {

  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  renderCollections() {
    const { collections } = this.props;

    if (!collections.length) {
      return null;
    }

    return _.map(collections, (col, i) =>
      <li key={i}>
        <Link activeClassName="active" to={`${ADMIN_PREFIX}/collections/${col.label}`}>
          <i className="fa fa-book" />Collection: {capitalize(col.label)}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div className="sidebar">
        <Link className="logo" to={`${ADMIN_PREFIX}/pages`} />
        <Splitter />
        <ul className="routes">
          <li>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/pages`}>
              <i className="fa fa-file-text" />
              {sidebar.pages}
            </Link>
          </li>

          {this.renderCollections()}

          <Splitter />
          <li>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/datafiles`}>
              <i className="fa fa-database" />
              {sidebar.datafiles}
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/staticfiles`}>
              <i className="fa fa-file" />
              {sidebar.staticfiles}
            </Link>
          </li>
          <Splitter />
          <li>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/configuration`}>
              <i className="fa fa-cog" />
              {sidebar.configuration}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  collections: PropTypes.array.isRequired,
  fetchCollections: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  collections: state.collections.collections
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCollections
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
