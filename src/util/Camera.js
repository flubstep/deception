/*
 * @providesModule 
 */

// todo: window scroll handler will zoom in and out

let {
  mapValues
} = require('lodash');

import Keyboard from 'util/Keyboard.js';

const panSpeed = 5;
const zoomRatio = 1.02;

export default class Camera {

  constructor(stage, options = {}) {
    this.stage = stage;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.z = options.z || 1;
    this.zoomIncr = 0;
    this.scrollTarget = 0;

    this.layer = new PIXI.Container();
    this.stage.addChild(this.layer);

    window.addEventListener('wheel', (e) => {
      this.scrollTarget += e.deltaY;
      e.preventDefault();
    });
  }

  pan(dx, dy) {
    this.x += dx;
    this.y += dy;
    this.flushUpdates();
  }

  zoomIn() {
    this.zoomIncr += 1;
    this.zoom(Math.pow(zoomRatio, this.zoomIncr));
  }

  zoomOut() {
    this.zoomIncr -= 1;
    this.zoom(Math.pow(zoomRatio, this.zoomIncr));
  }

  zoom(newZoom) {
    // correct for floating point errors
    if (
      newZoom > g.epsilon &&
      Math.abs(Math.round(newZoom) - newZoom) < g.epsilon
      ) {
      newZoom = Math.round(newZoom);
    }

    // correct the offset to keep the center of the screen
    // at the same x,y location
    let centerX = this.x + (g.screenWidth / 2 / this.z);
    let centerY = this.y + (g.screenHeight / 2 / this.z);
    this.x = centerX - (g.screenWidth / 2 / newZoom);
    this.y = centerY - (g.screenHeight / 2 / newZoom);
    this.z = newZoom;

    this.flushUpdates();
  }

  addChild(child) {
    this.layer.addChild(child);
  }

  removeChild(child) {
    this.layer.removeChild(child);
  }

  flushUpdates() {
    this.layer.x = -this.x * this.z;
    this.layer.y = -this.y * this.z;
    this.layer.scale = new PIXI.Point(this.z, this.z);
  }

  canvasPositionToCoordinates(x, y) {
    return {
      x: this.x + (x / this.z),
      y: this.y + (y / this.z)
    }
  }

  update(dt) {
    while (this.scrollTarget > 0) {
      this.zoomOut();
      this.scrollTarget--;
    }
    while (this.scrollTarget < 0) {
      this.zoomIn();
      this.scrollTarget++;
    }
    if (Keyboard.isDown("ArrowUp")) {
      this.pan(0, -panSpeed / this.z);
    }
    if (Keyboard.isDown("ArrowDown")) {
      this.pan(0, panSpeed / this.z);
    }
    if (Keyboard.isDown("ArrowLeft")) {
      this.pan(-panSpeed / this.z, 0);
    }
    if (Keyboard.isDown("ArrowRight")) {
      this.pan(panSpeed / this.z, 0);
    }
  }

}