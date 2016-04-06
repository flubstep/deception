/*
 * @providesModule GameThree
 */

import OutputContainer from './OutputContainer';

let lastT = null;

const animate = (t) => {
  // get the delta time since last frame
  requestAnimationFrame(animate);
  let dt = (t - lastT) / 1000;
  let fps = 1/dt;
  lastT = t;

  GameThree.update(dt);
  GameThree.renderer.render(GameThree.scene, GameThree.camera);
  OutputContainer.flushAll();
}

let GameThree = {};

// initialize the threejs renderer

GameThree.container = document.body;

GameThree.start = () => {
  GameThree.scene = new THREE.Scene();
  GameThree.camera = new THREE.PerspectiveCamera(75, g.screenWidth/g.screenHeight, 0.1, 1000);
  GameThree.renderer = new THREE.WebGLRenderer();
  GameThree.renderer.setSize(g.screenWidth, g.screenHeight);
  GameThree.container.appendChild(GameThree.renderer.domElement);

  GameThree.load();

  GameThree.renderer.domElement.addEventListener('click', GameThree.click);
  GameThree.renderer.domElement.addEventListener('mousedown', GameThree.mousedown);
  GameThree.renderer.domElement.addEventListener('mouseup', GameThree.mouseup);
  GameThree.renderer.domElement.addEventListener('mousemove', GameThree.mousemove);

  requestAnimationFrame((t) => {
    lastT = t;
    requestAnimationFrame(animate);
  });
}

GameThree.load = () => {};
GameThree.update = (dt) => {};
GameThree.click = (e) => {};
GameThree.mousedown = (e) => {};
GameThree.mouseup = (e) => {};
GameThree.mousemove = (e) => {};

export default GameThree;