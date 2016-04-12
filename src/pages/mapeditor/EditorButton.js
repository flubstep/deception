/*
 * @providesModule EditorButton
 */

import React from 'react';

const bs = 54; // button size
const ms = 8; // margin size

const styles = {
  container: {
    padding: ms,
    width: bs
  },
  button: {
    width: bs,
    height: bs,
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    cursor: 'pointer'
  },
  hoverText: {
    position: 'relative',
    display: 'table',
    left: ms/2,
    top: -(24 + ms/2),
    textAlign: 'center',
    height: 24,
    lineHeight: '24px',
    fontSize: 16,
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: 'rgba(0,0,0,0.75)',
    opacity: 1,
    zIndex: 2
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
  }

  render() {

    let text = this.props.text || this.props.selection.button;
    let icon = this.props.icon || this.props.selection.icon;
    let containerStyle = Object.assign({}, styles.container);
    let divStyle = Object.assign({}, styles.button);

    if (this.props.selection.shortcut) {
      text += ' [' + this.props.selection.shortcut + ']';
    }
    if (icon) {
      divStyle.backgroundImage = 'url("' + icon + '")';
    }
    if (this.props.selected) {
      divStyle.opacity = 1;
      containerStyle.backgroundColor = 'rgba(255,255,0,0.6)';
    } else if (this.state.hover || this.props.alwaysVisible) {
      divStyle.opacity = 1;
    } else {
      divStyle.opacity = 0.5;
    }

    return (
      <div style={containerStyle}>
        <div
          onClick={this.handleClick.bind(this)}
          onMouseOver={this.handleMouseOver.bind(this)}
          onMouseOut={this.handleMouseOut.bind(this)}
          style={divStyle}
          >
          {this.state.hover ? (<HoverText text={text} />) : null}
        </div>
      </div>
    );
  }
}

EditorButton.defaultProps = {
  alwaysVisible: false,
  selected: false,
  selection: {},
  icon: null,
  text: '',
}