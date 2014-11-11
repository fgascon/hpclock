var express = require('express');
var pkg = require('../package.json');
var servos = require('./servos');

var app = module.exports = express();

app.get('/', function(req, res){
    res.json({
        name: pkg.name,
        version: pkg.version
    });
});

app.post('/:motor/move', function(req, res){
    var position = req.query.position;
    if(!position){
        throw new Error("Invalid position");
    }
    servos.move(req.params.id, position);
    res.json({
        result: "success"
    });
});