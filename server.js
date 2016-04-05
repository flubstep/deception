"use strict";

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev');

var express = require('express');
var url = require('url');

var app = express();

app.use('/static', express.static('static'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

var server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: __dirname,
  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: "/assets/",
  stats: { colors: true },
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  }
});

server.listen(8081, "localhost", function() {});
app.listen(8080);