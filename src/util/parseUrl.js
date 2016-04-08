/*
 * providesModule parseUrl
 */

// todo: something like react router maybe
// if the overhead becomes worth it

let buildRe = /\/(.*)\/build/
let walkRe = /\/(.*)/

export default () => {
  let path = window.location.pathname;
  if (path == '/') {
    return {
      page: 'index',
      map: null
    }
  } else if (path.match(buildRe)) {
    let [_, map] = path.match(buildRe);
    return {
      page: 'build',
      map: map
    }
  } else if (path.match(walkRe)) {
    let [_, map] = path.match(walkRe);
    return {
      page: 'walk',
      map: map
    }
  }
}