'use strict'
let Conversion = require('./conversion'),
    ParseResult = require('./parse_result');

const regExpRate = /([A-Z]{3});([A-Z]{3});(\d*.\d*)/, // Reg exp for standard conversion
    regExpInit = /([A-Z]{3});(\d*.\d*);([A-Z]{3})/; // Reg exp for initial data to convert

// Declaration of used variables
let lineCount = 0,
    parseError = false,
    parseMessage = '';

// Fonction de parsing
function parse(filePath){
    return new Promise(function(resolve, reject){
        lineCount = 0;        
        let result = new ParseResult();
        
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(filePath)
        });

        lineReader.on('line', function (line) {
            if (lineCount === 0){
                // Special Case for first line, we have to now what to convert
                let regExpResult = line.match(regExpInit);
                parseError = parseError || !regExpResult;
                if (parseError){
                    parseMessage = `Error at line %lineCount. Invalid line`;
                }else{
                    result.initConversion(regExpResult[1],regExpResult[3],regExpResult[2]); 
                }
            }else if (lineCount >= 2){                
                // General case
                let regExpResult = line.match(regExpRate);
                if (!parseError){
                    parseError = parseError || !regExpResult;
                    if (parseError){
                        parseMessage = `Error at line %lineCount. Invalid line`;
                    }else{
                        let convertionTemp =new Conversion(lineCount-2,regExpResult[1],regExpResult[2],regExpResult[3]);
                        result.addConversion(convertionTemp); 
                    }
                }
            }
            // We skip line 2 because we don't need it
            lineCount++;           
        });
        
        lineReader.on('close', function(){
            if (parseError){
                reject(parseMessage);
            }else{                
                resolve(result);
            }
        });
    });

}


module.exports = {
    parse : parse
};