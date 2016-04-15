/*
 * @providesModule GameMap
 */

let {
  range,
  remove,
  toPairs
} = require('lodash');

import EventEmitter from 'events';
import Terrain from 'game/Terrain';

const tileSide = 60;

export default class GameMap {

  constructor(stage, firebaseRef) {
    // todo: move the view generation out of this object and
    // into a 2d specific sprite generator
    this.stage = stage;
    this.blocks = {};
    this.firebaseRef = firebaseRef;
    this.events = new EventEmitter();
    if (firebaseRef) {
      this.firebaseRef.once('value', (store) => {
        // todo: consolidate this with MapLoader? there's
        // actually not that much shared functionality
        this.load(store.val());
      });
    }
  }

  addListener(event, callback) {
    this.events.addListener(event, callback);
  }

  load(o) {
    // todo: make this live update
    this.events.emit('load');
    if (o) {
      toPairs(o).map(([x, xList]) => {
        toPairs(xList).map(([y, name]) => {
          if (name) {
            this.add(x*tileSide, y*tileSide, name, true);
          }
        });
      });
    }
  }

  saveTile(x, y) {
    if (!this.firebaseRef) {
      return;
    }
    let key = this._key(x, y);
    this.firebaseRef.transaction((o) => {
      if (!o) { o = {}; }
      if (!o[x]) { o[x] = {}; }
      // set the value based on the sprite's "name"
      if (this.blocks[key]) {
        o[x][y] = this.blocks[key].name;
      } else {
        o[x][y] = null;
      }
      return o;
    });
  }

  _key(x, y) {
    // todo: this is hack, remove
    return 'x:' + x + ',y:' + y;
  }

  _normalize(mapX, mapY) {
    let x = Math.floor(mapX/tileSide);
    let y = Math.floor(mapY/tileSide);
    let key = this._key(x, y);
    return {x, y, key};
  }

  add(mapX, mapY, terrain, fromStore) {
    let {x, y, key} = this._normalize(mapX, mapY);
    if (this.blocks[key]) {
      let oldSprite = this.blocks[key];
      if (oldSprite.name != terrain) {
        this.remove(x, y);
      } else {
        return;
      }
    }
    let factory = Terrain[terrain];
    if (!factory) {
      console.error("Invalid terrain to be added at " + x + ', ' + y + ': ' + terrain);
      return;
    }
    let sprite = factory.create({x, y});
    this.blocks[key] = sprite;
    this.stage.addChild(sprite);
    if (!fromStore) {
      this.saveTile(x, y);
    }
  }

  remove(mapX, mapY) {
    let {x, y, key} = this._normalize(mapX, mapY);
    if (this.blocks[key]) {
      let sprite = this.blocks[key];
      this.stage.removeChild(sprite);
      delete this.blocks[key];
      this.saveTile(x, y);
    }
  }

}