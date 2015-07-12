/**
* Simple wrapper for different elevations, and utility method.
**/
Elevation = {};

Elevation.ENUM = {
    LOW: 'bot',
    MID: 'mid',
    TOP: 'top'
};

/*
* PUBLIC
* Validate that the input value is part of the enum object.
*/
Elevation.validate = function(elevation) {
    for(var n in this.ENUM){
        if(elevation === this.ENUM[n]){
            return true;
        }
    }
    return false;
};

module.exports = Elevation;
