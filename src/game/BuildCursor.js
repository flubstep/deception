/**
 * @providesModule BuildCursor
 */

class DrawHandler {

  constructor(map, camera, terrain) {
    this.map = map;
    this.camera = camera;
    this.terrain = terrain;
    this.mouseDown = false;
  }
  onMouseDown(e) {
    this.mouseDown = true;
    this.onMouseMove(e);
  }
  onMouseUp(e) {
    this.mouseDown = false;
  }
  onMouseMove(e) {
    let position = this.camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
    if (this.mouseDown) {
      this.map.add(position.x, position.y, this.terrain);
    }
  }
}


class PanHandler {

  constructor(map, camera) {
    this.map = map;
    this.camera = camera;
    this.panning = false;
    this.startPosition = null;
  }
  onMouseDown(e) {
    this.panning = true;
    this.startPosition = {x: e.offsetX, y: e.offsetY};
  }
  onMouseUp(e) {
    this.panning = false;
  }
  onMouseMove(e) {
    if (this.panning) {
      let pos = {x: e.offsetX, y: e.offsetY};
      let [dx, dy] = [this.startPosition.x - pos.x, this.startPosition.y - pos.y];
      let zoom = this.camera.z;
      this.camera.pan(dx / zoom, dy / zoom);
      this.startPosition = pos;
    }
  }
}


class EraseHandler {

  constructor(map, camera) {
    this.map = map;
    this.camera = camera;
  }
  onMouseDown(e) {
    this.mouseDown = true;
    this.onMouseMove(e);
  }
  onMouseUp(e) {
    this.mouseDown = false;
  }
  onMouseMove(e) {
    let position = this.camera.canvasPositionToCoordinates(e.offsetX, e.offsetY);
    if (this.mouseDown) {
      this.map.remove(position.x, position.y, this.terrain);
    }
  }
}


export default class BuildCursor {

  constructor(map, camera) {
    this.map = map;
    this.camera = camera;
    this.setPanMode();
  }
  setDrawMode(terrain) {
    this.handler = new DrawHandler(this.map, this.camera, terrain);
  }
  setPanMode() {
    this.handler = new PanHandler(this.map, this.camera);
  }
  setEraseMode() {
    this.handler = new EraseHandler(this.map, this.camera);
  }
  onMouseDown(e) {
    if (this.handler) {
      this.handler.onMouseDown(e);
    }
  }
  onMouseMove(e) {
    if (this.handler) {
      this.handler.onMouseMove(e);
    }
  }
  onMouseUp(e) {
    if (this.handler) {
      this.handler.onMouseUp(e);
    }
  }
}
