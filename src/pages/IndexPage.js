/*
 * @providesModule IndexPage
 */

import React from 'react';
import ReactDOM from 'react-dom';

let {keys} = require('lodash');

const styles = {
  button: {
    border: '1px solid #333',
    backgroundColor: 'white',
    padding: 8,
    margin: 8
  }
}

const PageDisplay = (props) => (
  <div className='row'>
    <div style={styles.button} className='large-text'>
      <a href={'/' + props.name}>
        {"Visit world: " + decodeURIComponent(props.name)}
      </a>
    </div>
    <div className='medium-text'>
      <a href={'/' + props.name + '/build'}>
        Build this World
      </a>
    </div>
  </div>
)

const LevelAddition = (props) => {
  let value = "";
  return (
    <div className='row'>
      <input placeholder="New World Name" style={styles.button} className='medium-text' onChange={(e) => {
          value = e.nativeEvent.target.value;
        }}>
        </input>
      <button style={styles.button} className='medium-text' onClick={(e) => {
          document.location = '/' + encodeURIComponent(value) + '/build';
        }}>Create
      </button>
    </div>
  );
}

class IndexPage extends React.Component {

    constructor(props) {
        super(props);
        this.displayName = 'IndexPage';
        this.firebaseRef = new Firebase(g.firebaseUrl);
        this.firebaseRef.on('value', (store) => {
          let val = store.val();
          let pages = keys(val);
          this.setState({loaded: true, pages});
        });
        this.state = {
          loaded: false,
          pages: []
        }
    }

    render() {
        return (
          <div className="centered list">
            <h1>World of Worlds</h1>
            {
              this.state.loaded ?
                this.state.pages.map((page) => (
                  <PageDisplay key={page} name={page}
                />)) :
                (<p>Loading...</p>)
            }
            <h4>...or start a new world</h4>
            <LevelAddition />
          </div>
        );
    }
}

const load = () => {
  ReactDOM.render((<IndexPage />), document.getElementById('container'));
}

export default {
  load
};
