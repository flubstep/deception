/*
 * @providesModule InventorySelector
 */

import React from 'react';

// todo -- repeated code from EditorButton, consolidate into sharedStyles?
const bs = 60;
const ms = 8;

const styles = {
  inventory: {
    position: 'fixed',
    bottom: bs + ms*2,
    left: 0,
    display: 'flex'
  },
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
    cursor: 'pointer',
    border: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    textShadow: '2px 2px 2px black'
  },
}

export default class InventorySelector extends React.Component {

  selectIndex(index) {
    this.props.onSelectIndex(index);
  }

  renderSubcategory(category, index) {
    let backgroundStyle = {
      backgroundImage: 'url("' + category.icon + '")'
    };
    let highlightStyle = {};
    if (this.props.index == index) {
      highlightStyle.backgroundColor = 'rgba(255,255,0,0.6)';
    }
    let containerStyle = Object.assign({}, styles.container, highlightStyle);
    let buttonStyle = Object.assign({}, styles.button, backgroundStyle);
    return (
      <div
        key={category.button}
        style={containerStyle}
        >
        <div  
          style={buttonStyle}
          onClick={() => (this.selectIndex(index))}
          >
          {category.button}
        </div>
      </div>
    );
  }

  render() {
    let selection = this.props.selection;
    if (selection.subcategories) {
      return (
        <div style={styles.inventory} className="ui-container">
          {
            selection.subcategories.map((cat, index) => (
              this.renderSubcategory(cat, index)
            ))
          }
        </div>
      );
    } else {
      return null;
    }
  }
}