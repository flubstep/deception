'use strict';

import 'babel-core/register';
import 'babel-polyfill';
import './style.css';

import OutputContainer from 'util/OutputContainer';
import Constants from 'util/Constants';

// set up convenience functionality
window.g = Constants;
window.info = new OutputContainer('debug');

import WalkPage from 'pages/WalkPage';
import BuildPage from 'pages/BuildPage';
import IndexPage from 'pages/IndexPage';
import parseUrl from 'util/parseUrl';

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