var config = require('s-conf');

var POSITIONS_COUNT = config.require('positions_count');

var positionMaps = (function(stepsPerRevolution){
	var maps = {};
	var map;
	for(var motorId in stepsPerRevolution){
		map = {};
		for(var i=0; i<=POSITIONS_COUNT; i++){
			map[i] = Math.round(i*stepsPerRevolution[motorId]/POSITIONS_COUNT);
		}
		maps[motorId] = map;
	}
	return maps;
}(config.require('steps_per_revolution')));

exports.position2steps = function position2steps(motorId, position){
	if(position < 0 || position >= POSITIONS_COUNT){
		throw new Error("Invalid position "+position);
	}
	var positionMap = positionMaps[motorId];
	if(!positionMap){
		throw new Error("Invalid motor "+motorId);
	}
	return positionMap[position];
};
