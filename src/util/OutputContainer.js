/*
 * @providesModule OutputContainer
 */

let instances = [];

export default class OutputContainer {

  constructor(container) {
    this.container = document.getElementById(container);
    this.buffer = [];
    instances.push(this);
  }

  log() {
    let argList = Array.prototype.slice.call(arguments);
    let lineElems = argList.map((arg) => (arg.toString()));
    let line = lineElems.join(" ");
    this.buffer.push(line);
  }

  flush() {
    let text = this.buffer.join('\n');
    this.container.innerText = text;
    this.buffer = [];
  }

}

OutputContainer.flushAll = () => {
  instances.map((instance) => (instance.flush()));
}