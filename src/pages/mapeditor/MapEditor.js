/*
 * @providesModule MapEditor
 */

import React from 'react';

import EditorButton from 'pages/mapeditor/EditorButton';
import EditorOption from 'pages/mapeditor/EditorOption';
import parseUrl from 'util/parseUrl';
import Keyboard from 'util/Keyboard';

const styles = {
  debug: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    color: 'white'
  },
  sidebar: {
    paddingTop: 8
  }
}

const selections = [
  {
    button: 'Move',
    shortcut: 'M',
    icon: "/static/icons/ic_open_with_black_24dp_2x.png"
  },
  {
    button: 'Terrain',
    shortcut: 'T',
    icon: "/static/icons/ic_filter_hdr_black_24dp_2x.png",
    subcategories: [
      {
        button: 'Ocean',
        icon: "/static/icons/ocean_60x60.png"
      },
      {
        button: 'Grass',
        icon: "/static/icons/grassland_60x60.png"
      },
      {
        button: 'Forest',
        icon: "/static/icons/forest_60x60.png"
      },
      {
        button: 'Desert',
        icon: "/static/icons/desert_60x60.png"
      }
    ]
  },
  {
    button: 'Objects',
    shortcut: 'O',
    icon: "/static/icons/ic_local_florist_black_24dp_2x.png",
    subcategories: [
      {
        button: 'Hill',
        icon: "/static/icons/hill_60x60.png"
      },
      {
        button: 'Mountain',
        icon: "/static/icons/mountain_60x60.png"
      }
    ]
  },
  {
    button: 'Height',
    shortcut: 'H',
    icon: "/static/icons/ic_layers_black_24dp_2x.png"
  },
  {
    button: 'Erase',
    shortcut: 'E',
    icon: "/static/icons/ic_delete_black_24dp_2x.png"
  }
]

export default class MapEditor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      debugVisible: true,
      selectedCategory: selections[0],
      selectedIndex: 0,
      expandedSelections: false
    }
    this.fadeTimeout = 0;
    this.setupHandlers();
  }

  setupHandlers() {
    selections.map((s) => {
      if (s.shortcut) {
        Keyboard.addListener('Key' + s.shortcut, () => {
          this.select(s);
        });
      }
    });
  }

  select(selection, index = 0) {
    let current = this.state.selectedCategory;
    if (current.button === selection.button) {
      if (current.subcategories) {
        // this is the intended behavior, eventually the expandable
        // list should be moved to an always-visible box
        let newIndex = (this.state.selectedIndex + 1) % current.subcategories.length;
        this.setState({
          selectedIndex: newIndex
        });
      }
    } else {
      this.setState({
        selectedCategory: selection,
        selectedIndex: index
      });
    }
  }

  toggleDebug() {
    this.setState({debugVisible: !this.state.debugVisible});
  }

  redirectToWorld() {
    let route = parseUrl();
    window.location = '/' + encodeURIComponent(route.map);
  }

  renderSelection(selection) {
    let buttonText = selection.button;
    if (selection.shortcut) {
      buttonText += ' [' + selection.shortcut + ']';
    }
    return (
      <EditorButton
        selection={selection}
        key={selection.button}
        selected={(this.state.selectedCategory.button == selection.button)}
        selectedIndex={this.state.selectedIndex}
        onClick={() => {this.select(selection)}}
      />
    );
  }

  render() {
    return (
      <div id="editor" style={styles.sidebar} className="ui-container editor">
        {selections.map((selection) => (this.renderSelection(selection)))}
        <div className="options">
          <EditorButton
            text={this.state.debugVisible ? "Debug On" : "Debug Off"}
            icon="/static/icons/ic_track_changes_black_24dp_2x.png"
            alwaysVisible={this.state.debugVisible}
            onClick={this.toggleDebug.bind(this)}
            />
          <EditorButton
            text="Play World"
            icon="/static/icons/ic_play_circle_filled_black_24dp_2x.png"
            onClick={this.redirectToWorld.bind(this)}
            />
        </div>
        {this.state.debugVisible ? (<div id="debug" style={styles.debug} className="ui-container debug"></div>) : null}
      </div>
    );
  }

}
