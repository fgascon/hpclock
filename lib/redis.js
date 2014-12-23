var redis = require('redis');

var client = module.exports = redis.createClient();

client.on('error', function(err){
	console.error(err.stack||err);
});
