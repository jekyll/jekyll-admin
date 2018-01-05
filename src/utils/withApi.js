import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

const wrapWithApi = (apiCall, Component) => {
  class WithApi extends React.Component {
    static displayName = `withApi(${getDisplayName(Component)})`;
    state = {
      response: null,
    };

    async componentDidMount() {
      this.setState({ response: await apiCall() });
    }

    render() {
      return <Component {...this.props} data={this.state.response} />;
    }
  }

  return hoistStatics(WithApi, Component);
};

export default wrapWithApi;
