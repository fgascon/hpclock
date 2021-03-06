var http = require('http');
var config = require('s-conf');
var debug = require('debug')('hpclock:http');
var app = require('./app');

var server = module.exports = http.createServer(app);

server.listen(config.require('http_port'), config.get('http_host', '0.0.0.0'), function(){
    var address = server.address();
    debug("server listening on %s:%d", address.address, address.port);
});
