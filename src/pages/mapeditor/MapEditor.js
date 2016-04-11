/*
 * @providesModule MapEditor
 */

import React from 'react';

import EditorButton from 'pages/mapeditor/EditorButton';
import EditorOption from 'pages/mapeditor/EditorOption';
import parseUrl from 'util/parseUrl';

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
    subcategories: ['Ocean', 'Grass', 'Forest', 'Desert']
  },
  {
    button: 'Objects',
    shortcut: 'O',
    icon: "/static/icons/ic_local_florist_black_24dp_2x.png",
    subcategories: ['Hill', 'Mountain']
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
      selectedCategory: 'Move',
      selectedIndex: 0
    }
    this.setupHandlers();
  }

  setupHandlers() {
    selections.map((s) => {
      console.log('selecting ' + s.button);
      /*
      if (s.shortcut) {
        Keyboard.addListener(s.shortcut, () => {
          this.select(s.button);
        });
      }
      */
    });
  }

  select(button) {

  }

  toggleDebug() {
    this.setState({debugVisible: !this.state.debugVisible});
  }

  redirectToWorld() {
    let route = parseUrl();
    window.location = '/' + encodeURIComponent(route.map);
  }

  render() {
    return (
      <div id="editor" style={styles.sidebar} className="ui-container editor">
        <EditorButton
          text="Move [M]"
          icon="/static/icons/ic_open_with_black_24dp_2x.png" 
          />
        <EditorButton
          text="Terrain [T]"
          icon="/static/icons/ic_filter_hdr_black_24dp_2x.png"
          selected={true}
          />
        <EditorButton
          text="Objects [O]"
          icon="/static/icons/ic_local_florist_black_24dp_2x.png" 
          />
        <EditorButton
          text="Height [H]"
          icon="/static/icons/ic_layers_black_24dp_2x.png"
          />
        <EditorButton
          text="Erase [E]"
          icon="/static/icons/ic_delete_black_24dp_2x.png" 
          />
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
