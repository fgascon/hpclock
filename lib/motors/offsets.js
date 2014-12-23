var redis = require('../redis');

var offsets = {
	1: 0,
	2: 0
};

function fetchOffset(motorId){
	redis.get('motorpos:'+motorId, function(err, result){
		if(err){
			console.error(err.stack||err);
		}else{
			offsets[motorId] = result ? parseInt(result) : 0;
		}
	});
}

Object.keys(offsets).forEach(fetchOffset);

exports.get = function getOffset(motorId){
	return offsets[motorId];
};

exports.set = function setOffset(motorId, offset){
	offsets[motorId] = offset;
	redis.set('motorpos:'+motorId, offset, function(err){
		if(err){
			console.error(err.stack||err);
		}
	});
};