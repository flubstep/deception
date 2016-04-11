/*
 * @providesModule EditorButton
 */

import React from 'react';

let styles = {
  button: {
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  hoverText: {
    position: 'relative',
    left: (10+60+10),
    top: (60-24)/2-5,
    textAlign: 'center',
    height: 24,
    width: 80,
    lineHeight: '24px',
    padding: 5,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.75)',
    opacity: 1,
  }
}

const HoverText = (props) => {
  return (
    <div style={styles.hoverText}>
      {props.text}
    </div>
  );
}


export default class EditorButton extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: false
    };
  }

  handleMouseOver() {
    // could also handle this in css but prefer all styles to
    // be handled in js eventually
    this.setState({hover: true});
  }

  handleMouseOut() {
    this.setState({hover: false});
  }

  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    console.log('click.');
  }

  render() {
    let classNames = 'editor-button';
    if (this.props.selected) {
      classNames += ' selected';
    }

    let divStyle = Object.assign({}, styles.button);
    if (this.props.icon) {
      divStyle.backgroundImage = 'url("' + this.props.icon + '")';
    }
    divStyle.opacity = (this.props.selected || this.state.hover) ? 1 : 0.5;

    return (
      <div
        className={classNames}
        onClick={this.handleClick.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        style={divStyle}
        >
        {this.state.hover ? (<HoverText text={this.props.text} />) : null}
      </div>
    );
  }
}

EditorButton.defaultProps = {
  selected: false,
  icon: null
}