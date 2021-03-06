/*
 * @providesModule MapEditor
 */

import React from 'react';

import EditorButton from 'react/mapeditor/EditorButton';
import EditorOption from 'react/mapeditor/EditorOption';
import InventorySelector from 'react/mapeditor/InventorySelector';
import LoadingIndicator from 'react/LoadingIndicator';
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
    name: 'Move',
    button: 'Move [1]',
    shortcut: 'Digit1',
    icon: "/static/icons/ic_open_with_black_24dp_2x.png"
  },
  {
    name: 'Terrain',
    button: 'Terrain [2]',
    shortcut: 'Digit2',
    icon: "/static/icons/ic_layers_black_24dp_2x.png",
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
    name: 'Objects',
    button: 'Objects [3]',
    shortcut: 'Digit3',
    icon: "/static/icons/ic_filter_hdr_black_24dp_2x.png",
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
    name: 'Erase',
    button: 'Erase [4]',
    shortcut: 'Digit4',
    icon: "/static/icons/ic_delete_black_24dp_2x.png"
  }
]

export default class MapEditor extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      debugVisible: false,
      selectedCategory: selections[0],
      selectedIndex: 0,
      expandedSelections: false
    }
    this.fadeTimeout = 0;
    this.setupHandlers();
    if (this.props.map) {
      this.props.map.addListener('load', (() => {
        console.log('ready');
        this.setReady()
      }));
    }
  }

  setReady() {
    this.setState({loading: false});
  }

  componentWillUpdate(nextProps, nextState) {

    switch (nextState.selectedCategory.name) {
      case 'Move':
        window.cursor.setPanMode();
        break;

      case 'Terrain':
      case 'Objects':
        let terrain = nextState.selectedCategory.subcategories[nextState.selectedIndex].button;
        window.cursor.setDrawMode(terrain);
        break;

      case 'Erase':
        window.cursor.setEraseMode();
        break;

      default:
        console.warn('Undefined cursor state given:', nextState.selectedCategory.name);
        window.cursor.setPanMode();
    }
  }

  setupHandlers() {
    selections.map((s) => {
      if (s.shortcut) {
        Keyboard.addListener(s.shortcut, () => {
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
    if (this.props.map && this.state.loading) {
      return (<LoadingIndicator />);
    } else {
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
}

MapEditor.defaultProps = {
  map: null
}
