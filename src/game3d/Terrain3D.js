/*
 * @providesModule Terrain3D
 */

import {random, range} from 'lodash';

class GameObject {

  constructor(scene, options) {
    this.scene = scene;
    this.meshes = [];
    this.subObjects = [];
    this.create(options);
  }

  addMesh(mesh) {
    this.meshes.push(mesh);
    this.scene.add(mesh);
  }

  addObject(obj) {
    this.subObjects.push(obj);
  }

  remove(obj) {
    // todo: something for the meshes??
    this.meshes.map((mesh) => {
      this.scene.remove(mesh);
    });
    this.subObjects.map((obj) => { obj.remove(); });
  }
}

class Ocean extends GameObject {

  name() { return 'Ocean'; }

  create(options) {
    let color = (g.colors.oceanBlue);
    let geometry = new THREE.BoxGeometry(1, 0.2, 1);
    let material = new THREE.MeshLambertMaterial({color});
    let plane = new THREE.Mesh(geometry, material);
    plane.position.set(options.x, -0.3, options.y);
    this.addMesh(plane);
  }
}

class Grass extends GameObject {

  name() { return 'Grass'; }

  create(options) {
    let color = (g.colors.lawnGreen);
    let geometry = new THREE.BoxGeometry(1, 0.4, 1);
    let material = new THREE.MeshLambertMaterial({color});
    let plane = new THREE.Mesh(geometry, material);
    plane.position.set(options.x, -0.2, options.y);
    this.addMesh(plane);
  }
}

class Tree extends GameObject {

  create(options) {
    // todo: actually import real 3d models
    let trunkGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
    let trunkMaterial = new THREE.MeshLambertMaterial({color: g.colors.brown});
    let trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(options.x, 0.5, options.y);

    let leafGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let leafMaterial = new THREE.MeshLambertMaterial({color: g.colors.lawnGreen});
    let leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(options.x, 0.75, options.y);

    this.addMesh(trunk);
    this.addMesh(leaf);
  }
}

class Forest extends GameObject {

  name() { return 'Forest'; }

  create(options) {
    let {x, y} = options;
    let numTrees = random(3, 5);
    range(numTrees).map(() => {
      let treeX = x+random(-5, 5)/10;
      let treeY = y+random(-5, 5)/10;
      this.addObject(new Tree(this.scene, {x: treeX, y: treeY}));
    });
    this.addObject(new Grass(this.scene, options));
  }
}

class Hill extends GameObject {

  name() { return 'Hill'; }

  create(options) {
    let color = (g.colors.lawnGreen);
    let geometry = new THREE.BoxGeometry(1, 1.4, 1);
    let material = new THREE.MeshLambertMaterial({color});
    let box = new THREE.Mesh(geometry, material);
    box.position.set(options.x, 0.3, options.y);
    this.addMesh(box);
  }
}

class Mountain extends GameObject {

  name() { return 'Mountain'; }

  create(options) {
    let color = (g.colors.lawnGreen);
    let geometry = new THREE.BoxGeometry(1, 2.4, 1);
    let material = new THREE.MeshLambertMaterial({color});
    let box = new THREE.Mesh(geometry, material);
    box.position.set(options.x, 0.8, options.y);
    this.addMesh(box);
  }
}

class Desert extends GameObject {

  name() { return 'Desert'; }

  create(options) {
    let color = (g.colors.sand);
    let geometry = new THREE.BoxGeometry(1, 0.4, 1);
    let material = new THREE.MeshLambertMaterial({color});
    let plane = new THREE.Mesh(geometry, material);
    plane.position.set(options.x, -0.2, options.y);
    this.addMesh(plane);
  }
}

const Terrain3D = {
  Ocean,
  Grass,
  Forest,
  Hill,
  Mountain,
  Desert
}

export default Terrain3D;