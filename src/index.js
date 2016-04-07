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

if (window.location.pathname == '/') {
  window.addEventListener('load', WalkPage.load);
} else if (window.location.pathname == '/build') {
  window.addEventListener('load', BuildPage.load);
} else {
  console.error("Invalid page location: " + window.location.pathname)
}