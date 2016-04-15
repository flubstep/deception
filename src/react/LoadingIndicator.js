/*
 * @providesModule LoadingIndicator
 */

import React from 'react';

const styles = {
  container: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    color: 'white',
    fontWeight: 600,
    fontSize: 20,
  }
}

export default class LoadingIndicator extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      opacity: 1.0,
      direction: 1
    }
    this.timeout = setInterval(
      (() => {this.updateOpacity()}),
      16
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  updateOpacity() {
    let newOpacity = this.state.opacity;
    let direction = this.state.direction;
    newOpacity += this.props.speed * direction;
    if (newOpacity > 1) {
      newOpacity = 1;
      direction *= -1;
    } else if (newOpacity < 0) {
      newOpacity = 0;
      direction *= -1;
    }
    this.setState({
      opacity: newOpacity,
      direction: direction
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <span style={{opacity: this.state.opacity}}>Loading...</span>
        </div>
      </div>
    );
  }

}

LoadingIndicator.defaultProps = {
  speed: 0.01
}