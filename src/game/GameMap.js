/*
 * @providesModule GameMap
 */

let {
  range,
  remove
} = require('lodash');

import Terrain from './Terrain.js';

const tileSide = 60;

export default class GameMap {

  constructor(stage) {
    this.stage = stage;
    this.blocks = {};
  }

  _normalize(mapX, mapY) {
    let x = Math.floor(mapX/tileSide) * tileSide;
    let y = Math.floor(mapY/tileSide) * tileSide;
    let key = 'x:' + x + ',y:' + y;
    return {x, y, key};
  }

  add(mapX, mapY, terrain) {
    let {x, y, key} = this._normalize(mapX, mapY);
    if (this.blocks[key]) {
      let oldSprite = this.blocks[key];
      if (oldSprite.name != terrain) {
        this.remove(x, y);
      } else {
        return;
      }
    }
    let sprite = Terrain[terrain].create({x, y});
    this.blocks[key] = sprite;
    this.stage.addChild(sprite);
  }

  remove(mapX, mapY) {
    let {x, y, key} = this._normalize(mapX, mapY);
    if (this.blocks[key]) {
      let sprite = this.blocks[key];
      // this.stage.removeChild(sprite);
      delete this.blocks[key];
    }
  }

}