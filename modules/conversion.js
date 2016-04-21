'use strict'

module.exports = class Conversion{
    constructor(deviseSrc, deviseDest, rate){
        this.deviseSrc = deviseSrc;
        this.deviseDest = deviseDest;
        this.rate = rate;    
    }
    
    
    
    convert(currency){
        return currency * rate;
    }
}