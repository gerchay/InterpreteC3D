import fs from 'fs';
import Principal from './models/principal';

var parser = require('./models/grammar');

try{
    const entrada = fs.readFileSync('./src/entrada.txt');
    let interprete = parser.parse(entrada.toString());
    interprete.ejecutar();
    console.log(interprete);
}
catch(err){
    console.log(err);
}