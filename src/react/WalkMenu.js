/*
 * @providesModule WalkMenu
 */

import React from 'react';

import LoadingIndicator from 'react/LoadingIndicator';

export default class WalkMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true
    }
    this.props.loader.addListener('load', (() => {this.setReady()}));
  }

  setReady() {
    this.setState({loading: false});
  }

  render() {
    if (this.state.loading) {
      return (<LoadingIndicator />);
    } else {
      // todo: more stuff here
      return null;
    }
  }

}