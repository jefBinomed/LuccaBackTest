'use strict'

function search(src, dest, array, exclusions, output){    
    console.log("Enter Search : %s -> %s ", src,dest);
    for (var i =0; i < array.length; i++){
        let conversionTmp = array[i];
        if (conversionTmp.deviseDest === dest && conversionTmp.deviseSrc === src){
            return conversionTmp;
        }else{
            exclusions.push(conversionTmp.deviseSrc);
            let arrayTmp = array.filter((conversion)=>{
               return conversion.deviseSrc != conversionTmp.deviseSrc 
               && exclusions.indexOf(conversion.deviseSrc) === -1; 
            });
            if (arrayTmp.length >0){
                let outputTmp = output.slice();
                outputTmp.push(conversionTmp);
                let resultTmp = search(conversionTmp.deviseDest, dest, arrayTmp, outputTmp);
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
        let resultFinal = search(result.deviseSrc, result.deviseDest, arrayOrigin, [],[]);
        console.log(resultFinal);
    }
}


module.exports = {
    process : process
};