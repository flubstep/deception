/*
 * @providesModule Terrain
 */

const tileSide = 60;
const terrainSheet = PIXI.BaseTexture.fromImage("static/bigtrident/tiles.png");

let makeTerrain = (offsetX, offsetY, name) => {

  offsetX *= tileSide;
  offsetY *= tileSide;

  let rect = new PIXI.Rectangle(offsetX, offsetY, tileSide, tileSide);
  let texture = new PIXI.Texture(terrainSheet, rect);

  return {
    create: (options) => {
      let sprite = new PIXI.Sprite(texture);
      sprite.x = options.x || 0;
      sprite.y = options.y || 0;
      sprite.name = name;
      return sprite;
    }
  }
}

const Terrain = {
  Ocean: makeTerrain(12, 10, 'Ocean'),
  Grass: makeTerrain(0, 1, 'Grass'),
  Forest: makeTerrain(4, 10, 'Forest'),
  Hill: makeTerrain(0, 10, 'Hill'),
  Mountain: makeTerrain(8, 10, 'Mountain'),
  Desert: makeTerrain(0, 2, 'Desert'),
  Snow: makeTerrain(0, 3, 'Snow'),
}

export default Terrain;