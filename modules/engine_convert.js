'use strict'

function search(result, array, exclusions, output){
    for (var i =0; i < array.length; i++){
        let conversionTmp = array[i];
        if (conversionTmp.deviseDest === result.deviseDest){
            return conversionTmp;
        }else{
            exclusions.push(conversionTmp.deviseSrc);
            let arrayTmp = array.filter((conversion)=>{
               return conversion.deviseSrc != conversionTmp.deviseSrc 
               && exclusions.indexOf(conversion.deviseSrc) != -1; 
            });
            if (arrayTmp.length >0){
                let outputTmp = output.slice();
                outputTmp.push(conversionTmp);
                let resultTmp = search(result, arrayTmp, outputTmp);
                if (resultTmp != null){
                    return outputTmp.concat(resultTmp);
                }  
            }
        }
    }
    return null;
}

function process(result){
    console.log('Will convert %s to %s for %d', result.deviseSrc, result.deviseDest, result.amount);
    // TODO
    let arrayOrigin = result.findSrc(result.deviseSrc);
    if (arrayOrigin && arrayOrigin.length>0){
        let result = search(result, arrayOrigin, [],[]);
        console.log(result);
    }
}


module.exports = {
    process : process
};