'use strict'

/*
    Search all the paths
 */
function search(src, dest, result, exclusions){    
    
    // We only search through conversion with 'src' as source
    let array = result.findSrc(src);
    if (!array){
        return null;
    }
    // We reach only elements where the destination is not in the exclusion list => avoid loop
    array = array.filter((conversion)=>{
        return exclusions.indexOf(conversion.deviseDest) === -1; 
    });
    let mapResult = [];
    // for each result, we try to see if we match the dest or if in the recursive search we find a result
    for (var i =0; i < array.length; i++){
        let conversionTmp = array[i];
        // Direct conversion find        
        if (conversionTmp.deviseDest === dest 
            && conversionTmp.deviseSrc === src){
            mapResult.push({node : conversionTmp});
        }else{
            // We have to add the source as exclusion to avoid loop
            exclusions.push(conversionTmp.deviseSrc);
            // We search  in the rest if we could find a match
            let resultTmp = search(conversionTmp.deviseDest, dest, result, exclusions);
            if (resultTmp != null){
                // If yes we create a result of this path
                let nodeTmp = {node : conversionTmp, childs : resultTmp}
                mapResult.push(nodeTmp);
                resultTmp.forEach((data)=>{
                   data.parent = nodeTmp; 
                });
                
            }
        }
    }
    return mapResult.length > 0 ? mapResult : null;
}

/*
    Transform the tree to list
 */
function shortest(results){
    let result = [];
    let queue = results.slice();
    // We do a breadth-first-search
    while(queue.length >0){
        let tmpQueue = [];
        queue.forEach((data)=>{
            if (data.childs){
                data.childs.forEach((child)=>{
                    tmpQueue.push(child);
                });
            }else{
                // When we found a leaf, we construct the path
                let dataTmp = data;
                let arrayPath = [];
                while(dataTmp.parent){
                    arrayPath.push(dataTmp);   
                    dataTmp = dataTmp.parent;         
                }
                arrayPath.push(dataTmp);   
                result.push(arrayPath.reverse());
            }
        });
        queue = tmpQueue.slice();
    }    
    return result;
}


/* 
    Main function  
*/
function process(result){
    console.log('Will convert %s to %s for %d', result.deviseSrc, result.deviseDest, result.amount);
    let results = search(result.deviseSrc, result.deviseDest, result, []);
    if (results){        
        // We select the first shortest path
        let shortPath = shortest(results).sort(function(pathA, pathB){
            return pathA.length - pathB.length;
        })[0];
        
        // We calculate each conversion
        let finalAmount = result.amount;
        shortPath.forEach((data)=>{
            finalAmount = data.node.convert(finalAmount);
            console.log("%s->%s : %d", data.node.deviseSrc, data.node.deviseDest, finalAmount);
        });
        // We have to round the final result
        console.log("Final Result : %d %s = %d %s",result.amount, result.deviseSrc, Math.round(finalAmount), result.deviseDest);
    }else{
        console.log('No conversion found :(');
    }
}


module.exports = {
    process : process
};