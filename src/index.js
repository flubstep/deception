'use strict';

import 'babel-core/register';
import 'babel-polyfill';
import './style.css';

import OutputContainer from './util/OutputContainer.js';
import Constants from './util/Constants.js';

// set up convenience functionality
window.g = Constants;
window.info = new OutputContainer('debug');

import WalkPage from './pages/WalkPage.js';
import BuildPage from './pages/BuildPage.js';
import IndexPage from './pages/IndexPage.js';
import parseUrl from './util/parseUrl.js';

let route = parseUrl();

if (route.page == 'index') {
  window.addEventListener('load', IndexPage.load);
} else if (route.page == 'walk') {
  window.addEventListener('load', WalkPage.load);
} else if (route.page == 'build') {
  window.addEventListener('load', BuildPage.load);
} else {
  console.error("Invalid page location: " + window.location.pathname)
}