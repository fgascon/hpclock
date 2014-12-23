var EventEmitter = require('events').EventEmitter;
var serialport = require("serialport");
var config = require('s-conf');
var debug = require('debug')('hpclock:board');

var HIGH_WATERMARK = 50;

var serialIsOpened = false;
var outputBuffer = [];

var board = module.exports = new EventEmitter();

var sp = new serialport.SerialPort(config.require('usb_port'), {
	baudrate: config.get('usb_baudrate', 9600),
	parser: serialport.parsers.readline("\n")
}, false);

sp.open(function opened(err){
	if(err){
		return console.error(err.stack);
		throw err;
	}
	debug('connected to board');
	serialIsOpened = true;
	outputBuffer.forEach(function(data){
		sp.write(data);
	});
	outputBuffer = [];
	sp.on('data', function onData(line){
		debug('received data: '+line);
		events.emit('data', line);
	});
});

board.send = function sendData(data){
	debug('writing data:', data);
	if(serialIsOpened){
		sp.write(data);
	}else if(outputBuffer.length >= HIGH_WATERMARK){
		throw new Error("Output buffer overflow");
	}else{
		outputBuffer.push(data);
	}
};
