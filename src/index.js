var fs = require('fs');
var parser = require('./grammar/grammar');

try{
    const entrada = fs.readFileSync('./src/entrada.txt');
    parser.parse(entrada.toString());
    console.log("Correcto");
}
catch(err){
    console.log(err);
}