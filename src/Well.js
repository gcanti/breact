var t = require('tcomb');
var model = require('./util/model');
var BootstrapMixin = require('./util/BootstrapMixin');
var Component = require('react-bootstrap/Well');

var Model = model.create('Well', {
}, [BootstrapMixin]);

module.exports = model.bind(Model, Component);