'use strict'

module.exports = class Conversion{
    constructor(id, deviseSrc, deviseDest, rate){
        this.id = id;
        this.deviseSrc = deviseSrc;
        this.deviseDest = deviseDest;
        this.rate = rate;    
    }
    
    
    
    convert(currency){
        return currency * rate;
    }
}