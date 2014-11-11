var fs = require('fs');
var path = require('path');

if(!process.argv[2]){
    console.error("Config path missing");
    process.exit(1);
}

var configPath = path.resolve(process.argv[2]);

var configData = fs.readFileSync(configPath, 'utf8');

module.exports = JSON.parse(configData);
