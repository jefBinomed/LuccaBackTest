'use strict'

module.exports = class Conversion{
    constructor(deviseSrc, deviseDest, rate, reveseRate){
        this.deviseSrc = deviseSrc;
        this.deviseDest = deviseDest;
        this.rate = +rate;    
        this.reveseRate = reveseRate;
    }
    
    
    
    convert(amount){
        // We have to manage round conversion
        let useRate = this.reveseRate ? (Math.round((1 / this.rate)*10000 ) / 10000) : this.rate;
        return Math.round((+amount * useRate) * 10000) / 10000;
    }
}