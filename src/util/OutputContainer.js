/*
 * @providesModule OutputContainer
 */

let instances = [];

export default class OutputContainer {

  constructor(containerId) {
    this.containerId = containerId;
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
    let container = document.getElementById(this.containerId);
    if (container) {
      container.innerText = text;
    }
    this.buffer = [];
  }

}

OutputContainer.flushAll = () => {
  instances.map((instance) => (instance.flush()));
}