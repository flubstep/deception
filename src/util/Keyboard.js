/*
 * @providesModule Keyboard
 */

import {EventEmitter} from 'events';

const debug = false;

class Keyboard {

  constructor() {
    this.keyEvents = new EventEmitter();
    this.keyStates = {};
    window.addEventListener('keydown', this._keydownHandler.bind(this));
    window.addEventListener('keyup', this._keyupHandler.bind(this));
  }

  _keydownHandler(e) {
    let key = e.code;
    if (debug) {
      console.log('keydown:', key);
    }
    this.keyStates[key] = true;
    this.keyEvents.emit(key);
  }

  _keyupHandler(e) {
    let key = e.code;
    this.keyStates[key] = false;
  }

  isDown(key) {
    return this.keyStates[key];
  }

  addListener(key, callback) {
    this.keyEvents.addListener(key, callback);
  }

}

let instance = new Keyboard();

export default instance;