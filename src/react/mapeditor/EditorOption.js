/**
 * @providesModule EditorOption
 */

import React from 'react';

export default class EditorOption extends React.Component {

  handleClick() {
    console.log('click!');
  }

  render() {
    let classNames = 'editor-button';
    if (this.props.selected) {
      classNames += ' selected';
    }
    return (
      <div className={classNames} onClick={this.handleClick.bind(this)}>
        {this.props.backgroundImage ? (<img className="button-background" src={this.props.backgroundImage} />) : null}
        {this.props.hoverText}
      </div>
    );
  }

}

EditorOption.defaultProps = {
  selected: false,
  backgroundImage: null
}