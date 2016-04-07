/*
 * @providesModule MapLoader
 */

import Terrain3D from './Terrain3D';

let {toPairs} = require('lodash');

export default class MapLoader {

  constructor(scene, firebaseRef) {
    this.scene = scene;
    this.gameObjects = {};
    this.firebaseRef = firebaseRef;
    this.firebaseRef.on('value', (store) => {
      // todo: error handling on store error
      this.update(store.val());
    });
  }

  setdefault(x, y) {
    if (!this.gameObjects[x]) {
      this.gameObjects[x] = {};
    }
  }

  get(x, y) {
    this.setdefault(x, y);
    return this.gameObjects[x][y];
  }

  set(x, y, terrain) {
    if (Terrain3D[terrain]) {
      this.remove(x, y);
      this.gameObjects[x][y] = new Terrain3D[terrain](this.scene, {x, y});
    } else {
      console.error("Invalid terrain to be loaded: " + terrain);
    }
  }

  remove(x, y) {
    let obj = this.get(x, y);
    if (obj) {
      obj.remove();
      this.gameObjects[x][y] = undefined;
    }
  }

  update(val) {
    // todo: this is really inefficient, need to do more
    // incremental loading instead of large comparisons
    toPairs(val).map(([x, xList]) => {
      toPairs(xList).map(([y, terrain]) => {
        x = parseInt(x);
        y = parseInt(y);
        let current = this.get(x, y);
        if (current) {
          if (current.name() != terrain) {
            this.set(x, y, terrain);
          }
        } else {
          this.set(x, y, terrain);
        }
      });
    });
    // todo: handle tile removals
  }

}