'use strict'
var program = require('commander'),
    fs = require('fs'),
    parser = require('./modules/parser'),
    engine = require('./modules/engine_convert');

program
  .version('0.0.1')
  .option('-f, --file <file>', 'Device File')
  .parse(process.argv);
  

if (!program.file){
    console.error("Argument file missing ! ");
    return;    
}

try {
    console.log(program.file);
    fs.accessSync(program.file, fs.F_OK);
    // Do something
    parser.parse(program.file)
    .then((result)=>{
        engine.process(result); 
    })
    .catch((msg)=>{
        console.erro('Parse Error ! %s', msg);
    });
} catch (e) {
    console.error('File %s does not exists ! ', program.file);
    return;
}

