/*
 * @providesModule BuildPage
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Game from 'util/GameTwo';
import Camera from 'util/Camera';
import Keyboard from 'util/Keyboard';
import parseUrl from 'util/parseUrl';

import GameMap from 'game/GameMap';
import BuildCursor from 'game/BuildCursor';
import MapEditor from 'react/mapeditor/MapEditor';

// game logic main

let camera = null;
let gamemap = null;
let mousePosition = {x: 0, y: 0};
let mouseDown = false;

window.cursor = null;

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
  window.cursor = new BuildCursor(gamemap, camera);
  ReactDOM.render((<MapEditor map={gamemap}/>), document.getElementById('editor-container'));
}

Game.update = (dt) => {
  let fps = 1/dt;
  info.log('FPS:', round(1/dt));
  info.log('Camera Position: (' + round(camera.x) + ',' + round(camera.y) + ') @ ' + round(camera.z) + 'x');
  info.log('Mouse position: (' +  round(mousePosition.x) + ', ' + round(mousePosition.y) + ')')
  camera.update(dt);
}

Game.mousemove = (e) => {
  mousePosition = camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
  cursor.onMouseMove(e);
}

Game.mousedown = (e) => {
  cursor.onMouseDown(e);
}

Game.mouseup = (e) => {
  cursor.onMouseUp(e);
}

const load = () => {
  // don't anti-alias textures
  Game.container = document.getElementById('container');
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  PIXI.loader
    .add("static/tiles.png")
    .add("static/bigtrident/tiles.png")
    .load(Game.start);
}

const BuildPage = {
  load
};

export default BuildPage;
