var EventEmitter = require('events').EventEmitter;
var Cylon = require('cylon');
var config = require('./config');

var anglesMap = {
    1: 30,
    2: 60,
    3: 90
};

function position2angle(position){
    if(anglesMap[position]){
        return anglesMap[position];
    }else{
        return anglesMap[1];
    }
}

var positions = {};
var events = new EventEmitter();

var devicesConfig = [];

var motorConfig;
for(var id in config.motors){
    motorConfig = config.motors[id];
    motorConfig.name = "m"+id;
    motorConfig.driver = 'servo';
    devicesConfig.push(motorConfig);
    positions[id] = 1;
}

var robot = Cylon.robot({
    connection: {
        name: 'raspi',
        adaptor: 'raspi'
    },
    devices: devicesConfig,
    work: function(my){
        devicesConfig.forEach(function(motorConfig){
            var servo = my[motorConfig.name];
            var id = motorConfig.name.substr(1);
            events.on(id, function(position){
                servo.angle(position2angle(position));
            });
            servo.angle(position2angle(positions[id]));
        });
    }
});

robot.start();

exports.move = function(id, position){
    if(positions[id]){
        throw new Error("Invalid motor id '"+id+"'");
    }
    if(positions[id] !== position){
        positions[id] = position;
        events.emit(id, position);
    }
};