'use strict'

module.exports = class ParseResult{
    constructor(){
        this.deviseSrc = '';
        this.deviseDest = '';
        this.amount = 0;
        this.conversions = []; // Array of all conversions
        this.mapSrc = {};
        this.mapDest = {};
    }
    
    initConversion(deviseSrc, deviseDest, amount){
        this.deviseSrc = deviseSrc;
        this.deviseDest = deviseDest;
        this.amount = amount; 
    }
    
    addConversion(conversion){
        this.conversions.push(conversion);
        // We fill the correct map
        let srcArray = this.mapSrc[conversion.deviceSrc];
        if (!srcArray){
            srcArray = [];
            this.mapSrc[conversion.deviceSrc] = srcArray;
        }
        srcArray.push(conversion);
        let destArray = this.mapDest[conversion.deviceDest];
        if (!destArray){
            destArray = [];
            this.mapDest[conversion.deviceDest] = destArray;
        }
        destArray.push(conversion);
    }
    
    findSrc(srcDevise){
        return this.mapSrc[srcDevise];
    }
    
    findDest(destDevise){
        return this.mapDest[destDevise];
    }
    
    listConversions(){
        return conversions;
    }
}