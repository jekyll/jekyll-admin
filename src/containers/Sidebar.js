import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ADMIN_PREFIX } from '../constants';
import Splitter from '../components/Splitter';
import { fetchCollections } from '../actions/collections';
import { fetchConfig } from '../actions/config';
import { capitalize } from '../utils/helpers';
import { sidebar } from '../constants/lang';
import _ from 'underscore';

export class Sidebar extends Component {

  componentDidMount() {
    const { fetchCollections, fetchConfig } = this.props;
    fetchConfig();
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
          <i className="fa fa-book" />{capitalize(col.label)}
        </Link>
      </li>
    );
  }

  render() {
    const { config } = this.props;
    return (
      <div className="sidebar">
        <Link className="logo" to={`${ADMIN_PREFIX}/pages`} />
        <ul className="routes">
          <li>
            <Link activeClassName="active" to={`${ADMIN_PREFIX}/pages`}>
              <i className="fa fa-file-text" />
              {sidebar.pages}
            </Link>
          </li>

          {this.renderCollections()}
          {
            config.content && config.content.show_drafts &&
              <li>
                <Link activeClassName="active" to={`${ADMIN_PREFIX}/drafts`}>
                  <i className="fa fa-edit" />
                  {sidebar.drafts}
                </Link>
              </li>
          }
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
  config: PropTypes.object.isRequired,
  fetchCollections: PropTypes.func.isRequired,
  fetchConfig: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  config: state.config.config,
  collections: state.collections.collections
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchConfig,
  fetchCollections
}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);
