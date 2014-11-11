var http = require('http');
var app = require('./app');
var config = require('./config');

var server = module.exports = http.createServer(app);

var port = process.env.PORT || config.http_port;
var host = process.env.IP || config.http_host || '0.0.0.0';

server.listen(port, host, function(){
    var address = server.address();
    console.log("HTTP server listening on %s:%d", address.address, address.port);
});
