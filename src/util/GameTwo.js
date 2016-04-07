/*
 * @providesModule GameTwo
 */

import OutputContainer from './OutputContainer';

let lastT = null;

const animate = (t) => {
  // get the delta time since last frame
  requestAnimationFrame(animate);
  let dt = (t - lastT) / 1000;
  let fps = 1/dt;
  lastT = t;

  GameTwo.update(dt);
  GameTwo.renderer.render(GameTwo.stage);
  OutputContainer.flushAll();
}

let GameTwo = {};

// create a new instance of a pixi stage
GameTwo.stage = new PIXI.Stage(0x66FF99);
GameTwo.stage.interactive = true;

// create a renderer instance.
GameTwo.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
GameTwo.renderer.backgroundColor = 0xFFFFFF;

GameTwo.container = document.body;

GameTwo.start = () => {
  GameTwo.load();
  GameTwo.container.appendChild(GameTwo.renderer.view);

  GameTwo.renderer.view.addEventListener('click', GameTwo.click);
  GameTwo.renderer.view.addEventListener('mousedown', GameTwo.mousedown);
  GameTwo.renderer.view.addEventListener('mouseup', GameTwo.mouseup);
  GameTwo.renderer.view.addEventListener('mousemove', GameTwo.mousemove);

  requestAnimationFrame((t) => {
    lastT = t;
    requestAnimationFrame(animate);
  });
}

GameTwo.load = () => {};
GameTwo.update = (dt) => {};
GameTwo.click = (e) => {};
GameTwo.mousedown = (e) => {};
GameTwo.mouseup = (e) => {};
GameTwo.mousemove = (e) => {};

export default GameTwo;