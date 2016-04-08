/*
 * @providesModule WalkPage
 */

import Game from '../util/GameThree.js';
import Camera from '../util/Camera.js';
import GameMap from '../game/GameMap.js';
import Keyboard from '../util/Keyboard.js';
import Terrain3D from '../game3d/Terrain3D.js';
import MapLoader from '../game3d/MapLoader.js';
import parseUrl from '../util/parseUrl.js';

// game logic main
let {range, random} = require('lodash');

window.camera = null;
window.gamemap = null;
window.cubes = [];

const speed = 2;
const rotSpeed = 1;

const round = (n, digits = 2) => {
  let r = Math.pow(10, digits);
  return Math.round(n * r) / r;
}

const makeSky = (scene) => {
  let geometry = new THREE.SphereGeometry(100, 60, 40);
  let material = new THREE.MeshBasicMaterial({color: g.colors.skyBlue});
  let sky = new THREE.Mesh(geometry, material);
  sky.material.side = THREE.DoubleSide;
  scene.add(sky);
  return sky;
}

Game.load = () => {
  let route = parseUrl();
  camera = Game.camera;
  let firebaseRef = new Firebase(g.firebaseUrl).child(route.map);
  let loader = new MapLoader(Game.scene, firebaseRef);

  let sky = makeSky(Game.scene);
  let light = new THREE.PointLight(0xffffff, 1, 30, 1);
  light.position.set(0, 5, 5);
  Game.scene.add(light);

  Game.camera.position.y = 0.5;
  Game.camera.position.z = 5;
}

Game.update = (dt) => {
  let fps = 1/dt;
  info.log('FPS:', round(1/dt));
  info.log('Camera position: (' + [camera.position.x, camera.position.y, camera.position.z].map(round).join(', ') + ')');

  let direction = camera.getWorldDirection().normalize();

  if (Keyboard.isDown('ArrowDown')) {
    camera.position.sub(direction.multiplyScalar(dt * speed));
  }
  if (Keyboard.isDown('ArrowUp')) {
    camera.position.add(direction.multiplyScalar(dt * speed));
  }
  if (Keyboard.isDown('ArrowLeft')) {
    camera.rotation.y += rotSpeed * dt;
  }
  if (Keyboard.isDown('ArrowRight')) {
    camera.rotation.y -= rotSpeed * dt;
  }

}

Game.container = document.getElementById('container');

const WalkPage = {
  load: Game.start
}

export default WalkPage;