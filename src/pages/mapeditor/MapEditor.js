/*
 * @providesModule MapEditor
 */

import React from 'react';

import EditorButton from './EditorButton.js';
import EditorOption from './EditorOption.js';

export default class MapEditor extends React.Component {
  render() {
    return (
      <div id="editor" className="ui-container editor">
        <EditorButton
          text="Move"
          icon="/static/icons/ic_open_with_black_24dp_2x.png" 
          />
        <EditorButton
          text="Terrain"
          icon="/static/icons/ic_create_black_24dp_2x.png"
          selected={true}
          />
        <EditorButton
          text="Objects"
          icon="/static/icons/ic_create_black_24dp_2x.png" 
          />
        <EditorButton
          text="Erase"
          icon="/static/icons/ic_delete_black_24dp_2x.png" 
          />
        <div className="options">
          <EditorOption
            text="Debug"
            icon="/static/icons/ic_track_changes_black_24dp_2x.png"
            />
          <EditorOption
            text="Play World"
            icon="/static/icons/ic_play_circle_filled_black_24dp_2x.png"
            />
        </div>
      </div>
    );
  }

}
