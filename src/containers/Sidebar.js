import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ADMIN_PREFIX } from '../constants';
import Splitter from '../components/Splitter';
import { fetchCollections } from '../ducks/collections';
import { capitalize } from '../utils/helpers';
import { sidebar as SidebarTranslations } from '../translations';
import _ from 'underscore';

export class Sidebar extends Component {
  componentDidMount() {
    const { fetchCollections } = this.props;
    fetchCollections();
  }

  renderCollections(hiddens = []) {
    const { collections } = this.props;

    if (!collections.length) {
      return null;
    }

    return _.map(collections, (col, i) => {
      if (_.indexOf(hiddens, col.label) == -1) {
        return (
          <li key={i}>
            <Link
              activeClassName="active"
              to={`${ADMIN_PREFIX}/collections/${col.label}`}
            >
              <i className="fa fa-book" />
              {capitalize(col.label)}
            </Link>
          </li>
        );
      }
    });
  }

  render() {
    const { config } = this.props;

    const defaults = {
      pages: {
        icon: 'file-text',
        link: 'pages',
        translation: 'pages',
      },
      datafiles: {
        icon: 'database',
        link: 'datafiles',
        translation: 'datafiles',
        splitterBefore: true,
      },
      staticfiles: {
        icon: 'file',
        link: 'staticfiles',
        translation: 'staticfiles',
      },
      configuration: {
        icon: 'cog',
        link: 'configuration',
        translation: 'configuration',
        splitterBefore: true,
      },
    };

    const defaultLinks = _.keys(defaults);
    let hiddenLinks;
    try {
      hiddenLinks = config.jekyll_admin.hidden_links;
    } catch (e) {
      hiddenLinks = [];
    }

    const visibleLinks = _.difference(defaultLinks, hiddenLinks);

    const links = [];
    _.each(visibleLinks, (link, index, list) => {
      const current = defaults[link];
      if (current.splitterBefore) {
        links.push(<Splitter key={'splitter' + index} />);
      }
      links.push(
        <li key={index}>
          <Link activeClassName="active" to={`${ADMIN_PREFIX}/${current.link}`}>
            <i className={`fa fa-${current.icon}`} />
            {SidebarTranslations[current.translation]}
          </Link>
        </li>
      );
    });

    return (
      <div className="sidebar">
        <Link className="logo" to={`${ADMIN_PREFIX}/pages`} />
        <ul className="routes">
          {this.renderCollections(hiddenLinks)}
          {config &&
            config.show_drafts && (
              <li>
                <Link activeClassName="active" to={`${ADMIN_PREFIX}/drafts`}>
                  <i className="fa fa-edit" />
                  {SidebarTranslations.drafts}
                </Link>
                {!hiddenLinks.includes('posts') && <Splitter />}
              </li>
            )}
          {links}
        </ul>
      </div>
    );
  }
}

Sidebar.propTypes = {
  collections: PropTypes.array.isRequired,
  fetchCollections: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  collections: state.collections.collections,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCollections,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
