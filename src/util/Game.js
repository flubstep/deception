/*
 * @providesModule Game
 */

import OutputContainer from './OutputContainer';

let lastT = null;

const animate = (t) => {
  // get the delta time since last frame
  requestAnimationFrame(animate);
  let dt = (t - lastT) / 1000;
  let fps = 1/dt;
  lastT = t;

  Game.update(dt);
  Game.renderer.render(Game.stage);
  OutputContainer.flushAll();
}

let Game = {};

// create a new instance of a pixi stage
Game.stage = new PIXI.Stage(0x66FF99);
Game.stage.interactive = true;

// create a renderer instance.
Game.renderer = PIXI.autoDetectRenderer(800, 600);
Game.renderer.backgroundColor = 0xFFFFFF;

Game.container = document.body;

Game.start = () => {
  Game.load();
  Game.container.appendChild(Game.renderer.view);

  Game.renderer.view.addEventListener('click', Game.click);
  Game.renderer.view.addEventListener('mousedown', Game.mousedown);
  Game.renderer.view.addEventListener('mouseup', Game.mouseup);
  Game.renderer.view.addEventListener('mousemove', Game.mousemove);

  requestAnimationFrame((t) => {
    lastT = t;
    requestAnimationFrame(animate);
  });
}

Game.load = () => {};
Game.update = (dt) => {};
Game.click = (e) => {};
Game.mousedown = (e) => {};
Game.mouseup = (e) => {};
Game.mousemove = (e) => {};

export default Game;