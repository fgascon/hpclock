var express = require('express');
var bodyParser = require('body-parser');
var pkg = require('../package.json');
var motors = require('./motors');

var app = module.exports = express();

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.json({
        name: pkg.name,
        version: pkg.version
    });
});

app.post('/move', function(req, res){
    var user = req.body.user;
    if(!user || (user != 1 && user != 2)){
        throw new Error("Invalid user "+user);
    }
    var position = req.body.position;
    if(!position){
        throw new Error("Invalid position");
    }
    motors.move(user, position);
    res.json({
        result: "success"
    });
});
