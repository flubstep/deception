/*
 * @providesModule MapEditor
 */

import React from 'react';

import EditorButton from 'pages/mapeditor/EditorButton';
import EditorOption from 'pages/mapeditor/EditorOption';
import InventorySelector from 'pages/mapeditor/InventorySelector';
import parseUrl from 'util/parseUrl';
import Keyboard from 'util/Keyboard';

const styles = {
  debug: {
    position: 'fixed',
    top: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    color: 'white'
  },
  bottombar: {
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex'
  },
  options: {
    position: 'absolute',
    right: 0,
    display: 'flex'
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
      debugVisible: false,
      selectedCategory: selections[0],
      selectedIndex: 0,
      expandedSelections: false
    }
    this.fadeTimeout = 0;
    this.setupHandlers();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedCategory.subcategories) {
      // todo -- use a 'terrain adder' module or something like that
      window.currentTerrain = nextState.selectedCategory.subcategories[nextState.selectedIndex].button;
    }
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

  select(selection, index = undefined) {
    let current = this.state.selectedCategory;
    if (current.button === selection.button) {
      if (current.subcategories) {
        // this is the intended behavior, eventually the expandable
        // list should be moved to an always-visible box
        let newIndex = index;
        if (typeof(newIndex) === 'undefined') {
          newIndex = (this.state.selectedIndex + 1) % current.subcategories.length;
        }
        this.setState({
          selectedIndex: newIndex
        });
      }
    } else {
      this.setState({
        selectedCategory: selection,
        selectedIndex: index || 0
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
      <div id="editor" style={styles.bottombar} className="ui-container">
        {selections.map((selection) => (this.renderSelection(selection)))}
        <div style={styles.options}>
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
        <InventorySelector
          onSelectIndex={this.select.bind(this, this.state.selectedCategory)}
          selection={this.state.selectedCategory}
          index={this.state.selectedIndex}
        />
      </div>
    );
  }

}
