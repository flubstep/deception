'use strict';

import 'babel-core/register';
import 'babel-polyfill';
import './style.css';
import Game from './util/Game';

// don't anti-alias textures
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
Game.container = document.getElementById('container');

import OutputContainer from './util/OutputContainer.js';
import Constants from './util/Constants.js';
import Camera from './util/Camera.js';
import GameMap from './game/GameMap.js';
import Keyboard from './util/Keyboard.js';

// set up convenience functionality
window.g = Constants;
window.info = new OutputContainer('debug');
window.Game = Game;

// game logic main

let camera = null;
let gamemap = null;
let mousePosition = {x: 0, y: 0};
let mouseDown = false;
let currentTerrain = 'Ocean';

let {range} = require('lodash');

const round = (n, digits = 2) => {
  let r = Math.pow(10, digits);
  return Math.round(n * r) / r;
}

Game.load = () => {
  camera = new Camera(Game.stage);
  gamemap = new GameMap(camera);
  range(0, 100).map((i) => {
    range(0, 100).map((j) => {
      gamemap.add(i*60, j*60, 'Ocean');
    });
  });
  let select = (terrain) => {
    return () => {
      currentTerrain = terrain;
    };
  }

  Keyboard.addListener('Digit1', select('Ocean'));
  Keyboard.addListener('Digit2', select('Grass'));
  Keyboard.addListener('Digit3', select('Forest'));
  Keyboard.addListener('Digit4', select('Hill'));
  Keyboard.addListener('Digit5', select('Mountain'));
  Keyboard.addListener('Digit6', select('Desert'));
  Keyboard.addListener('Digit7', select('Snow'));

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
  if (mouseDown) {
    gamemap.add(mousePosition.x, mousePosition.y, currentTerrain);
  }
}

Game.mousedown = (e) => {
  mouseDown = true;
  mousePosition = camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
  gamemap.add(mousePosition.x, mousePosition.y, currentTerrain);
}

Game.mouseup = (e) => {
  mouseDown = false;
}

PIXI.loader
  .add("static/tiles.png")
  .add("static/bigtrident/tiles.png")
  .load(Game.start);
