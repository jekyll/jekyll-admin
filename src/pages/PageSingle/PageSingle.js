import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import Breadcrumbs from 'components/Breadcrumbs';

class PageSingle extends Component {
  render() {
    const { match: { params: { splat, filename, ext } } } = this.props;
    return (
      <div>
        <Breadcrumbs root="pages" splat={`${splat}/${filename}.${ext}`} />
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(PageSingle);
