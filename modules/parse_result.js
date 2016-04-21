'use strict'

module.exports = class ParseResult{
    constructor(){
        this.deviseSrc = '';
        this.deviseDest = '';
        this.amount = 0;
        this.mapSrc = {};
    }
    
    initConversion(deviseSrc, deviseDest, amount){
        this.deviseSrc = deviseSrc;
        this.deviseDest = deviseDest;
        this.amount = amount; 
    }
    
    addConversion(conversion){
        // We fill the correct map
        let srcArray = this.mapSrc[conversion.deviseSrc];
        if (!srcArray){
            srcArray = [];
            this.mapSrc[conversion.deviseSrc] = srcArray;
        }
        srcArray.push(conversion);        
    }
    
    findSrc(srcDevise){
        return this.mapSrc[srcDevise];
    }
        
}