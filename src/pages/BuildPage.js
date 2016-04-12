/*
 * @providesModule BuildPage
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MapEditor from './mapeditor/MapEditor.js';

import Game from '../util/GameTwo.js';
import Camera from '../util/Camera.js';
import GameMap from '../game/GameMap.js';
import Keyboard from '../util/Keyboard.js';
import parseUrl from '../util/parseUrl.js';

// game logic main

let camera = null;
let gamemap = null;
let mousePosition = {x: 0, y: 0};
let mouseDown = false;
// todo -- make this into its own module
window.currentTerrain = null;

let {range} = require('lodash');

const round = (n, digits = 2) => {
  let r = Math.pow(10, digits);
  return Math.round(n * r) / r;
}

Game.load = () => {
  let route = parseUrl();
  let firebaseRef = new Firebase(g.firebaseUrl).child(route.map);
  camera = new Camera(Game.stage);
  gamemap = new GameMap(camera, firebaseRef);
  window.camera = camera;
}

Game.update = (dt) => {
  let fps = 1/dt;
  info.log('FPS:', round(1/dt));
  info.log('Camera Position: (' + round(camera.x) + ',' + round(camera.y) + ') @ ' + round(camera.z) + 'x');
  info.log('Mouse down:', mouseDown);
  info.log('Mouse position: (' +  round(mousePosition.x) + ', ' + round(mousePosition.y) + ')')
  info.log('Terrain: ' + currentTerrain);
  camera.update(dt);
}

Game.mousemove = (e) => {
  mousePosition = camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
  if (mouseDown && currentTerrain) {
    gamemap.add(mousePosition.x, mousePosition.y, currentTerrain);
  }
}

Game.mousedown = (e) => {
  mouseDown = true;
  mousePosition = camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
  if (currentTerrain) {
    gamemap.add(mousePosition.x, mousePosition.y, currentTerrain);
  }
}

Game.mouseup = (e) => {
  mouseDown = false;
}

const load = () => {
  // don't anti-alias textures
  Game.container = document.getElementById('container');
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  PIXI.loader
    .add("static/tiles.png")
    .add("static/bigtrident/tiles.png")
    .load(Game.start);

  ReactDOM.render((<MapEditor />), document.getElementById('editor-container'));
}

const BuildPage = {
  load
};

export default BuildPage;
