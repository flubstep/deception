/*
 * @providesModule WalkPage
 */

import Game from '../util/GameThree.js';
import Camera from '../util/Camera.js';
import GameMap from '../game/GameMap.js';
import Keyboard from '../util/Keyboard.js';

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

const makeCube = (scene, x, y, z, height) => {
  let geometry = new THREE.BoxGeometry(1, height, 1);
  let material = new THREE.MeshPhongMaterial( {color: 0xffffff });
  let cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  cube.material.side = THREE.DoubleSide;
  scene.add(cube);
  return cube;
}

const makeGround = (scene) => {

  range(-10, 10).map((z) => {
    range(-10, 10).map((x) => {
      let color = (x == 0 || z == 0 || z == -2 || z == -4 || z == -6) ? 0xaaddaa : 0x009900;
      let geometry = new THREE.BoxGeometry(1, 0.2, 1);
      let material = new THREE.MeshLambertMaterial({color});
      let plane = new THREE.Mesh(geometry, material);
      plane.position.set(x, -0.1, z);
      scene.add(plane);
    });
  });
}

const makeSky = (scene) => {
  let geometry = new THREE.SphereGeometry(100, 60, 40);
  let material = new THREE.MeshBasicMaterial({color: 0x002044});
  let sky = new THREE.Mesh(geometry, material);
  sky.material.side = THREE.DoubleSide;
  scene.add(sky);
  return sky;
}

Game.load = () => {
  camera = Game.camera;
  range(-5, 5).map((i) => {
    ([-1, -3, -5, -7]).map((j) => {
      let height = random(1, 3);
      makeCube(Game.scene, i*2+1, height/2, j, height);
    });
  });

  let ground = makeGround(Game.scene);
  let sky = makeSky(Game.scene);

  window.light = new THREE.PointLight(0xffffff, 1, 30, 1);
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
  //light.position.set(camera.position.x, camera.position.y+1, camera.position.z);

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