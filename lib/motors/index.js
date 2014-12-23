var config = require('s-conf');
var debug = require('debug')('hpclock:motors');
var board = require('./board');
var steps = require('./steps');
var offsets = require('./offsets');

var motors = module.exports;

board.on('data', function onData(line){
	var parts = line.split(':');
	if(parts.length === 2){
		var motorId = parts[0];
		var position = parts[1];
		offsets.set(motorId, position);
	}else{
		debug("Invalid data: "+line);
	}
});

motors.move = function move(motorId, position){
	var stepsPos = steps.position2steps(motorId, position) + offsets.get(motorId);
	debug('move %d to %d (at %d steps)', motorId, position, stepsPos);
	board.send(new Buffer([motorId, stepsPos]));
};
