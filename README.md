Running this:
===

- Check out the git repo somewhere and `cd` into it.
- `npm install` and wait for a while
- `npm run dev` will start a webserver on http://localhost:8080

Playing around:
===

- `index.js` is the entry point for the script (it gets loaded in at the end of index.html)
- ES6 as a language is pretty cool: [ES6 Features](http://es6-features.org/#ClassDefinition)
- THREE is loaded in from the static/ folder, documentation here: [ThreeJS docs](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene)

Basics:
===

- Globals are defined in `Constants.js`
- `Game` is actually a `GameThree` object... will fix that someday
- `Game.load` creates a bunch of ThreeJS objects that get added to `Game.scene` (a THREE.Scene())
- `Game.update` gets called on every animation frame, effectively 60x per second
- `Game.camera` can move around the same way that any object can, except it also has directionality
- I wrote a `Keyboard` handler that I can easily use to track if a key is down or not (has some bugs)
- The part that really made me understand this is that everything is just handled 16ms at a time. Basically every 16ms you figure out what needs to change and then change it.