/**
 * Utility module that helps us convert from/to metric/imperial
 */

UnitUtil = {
    //Setup conversion variables as constants
    TO_MPH: 1.609344,
    TO_KPH: 0.62137,
    TO_CM: 0.39370,
    TO_IN: 2.54,
    TO_FT: 3.2808399,
    TO_M: 0.3048,

    /**
    * PUBLIC
    * Converts mph to kph
    * speed
    *  in mph
    *
    * returns: speed in kph, rounded up.
    */
    speedToMetric: function(speed){
      var kph = speed / this.TO_KPH;
      return Math.round(kph);
    },

    /**
    * PUBLIC
    * Converts kph to mph
    * speed
    *  in kph
    *
    * returns: speed in mph, rounded up.
    */
    speedToImperial: function(speed){
      var mph = speed / this.TO_MPH;
      return this.roundTo(5, Math.round(mph));
    },

    /**
    * PUBLIC
    * Converts feet to metres
    * distance
    *  in feet
    *
    * returns: metres, rounded up to nearest 50m.
    */
    distanceToMetric: function(distance){
      return this.roundTo(50, Math.round(distance*this.TO_M));
    },

    /**
    * PUBLIC
    * Converts metres to feet
    * distance
    *  in metres
    *
    * returns: feet, rounded up to nearest 100ft.
    */
    distanceToImperial: function(distance){
      return this.roundTo(100,Math.round(distance*this.TO_FT));
    },

    /**
    * PUBLIC
    * Converts inches to cm
    * volume
    *  in inches
    *
    * returns: cm, rounded up.
    */
    volumeToMetric: function(volume){
      return Math.round( (volume/this.TO_CM)*10 )/10;
    },

    /**
    * PUBLIC
    * Converts cm to inches
    * volume
    *  in cm
    *
    * returns: inches, rounded up.
    */
    volumeToImperial: function(volume){
      return Math.round( (volume/this.TO_IN)*10 )/10;
    },

    /**
    * PUBLIC
    * Converts degrees fahrenheit to celcius
    * temp
    *  temperature in degrees fahrenheit
    *
    * returns: temperature in degrees celcius rounded up.
    */
    temperatureToMetric: function(temp){
      var temperature = (temp-32)*5/9;
      return this.roundTo(1, Math.round(temperature));
    },

    /**
    * PUBLIC
    * Converts degrees celcius to fahrenheit
    * temp
    *  temperature in degrees celcius
    *
    * returns: temperature in fahrenheit rounded up.
    */
    temperatureToImperial: function(temp){
      var temperature = (temp*9)/5 +32;
      return this.roundTo(1, Math.round(temperature));
    },

    /**
    * Public (shouldn't be...)
    * Copied code from stack overflow to round numbers to nearest multiple.
    * Credit to Makrem Saleh from:
    *   https://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
    *
    * multiple
    *  Nearest number to round to
    * value
    *
    * returns: number that has been rounded up/down to specified multiple.
    */
    roundTo: function(multiple, value){
      var rem = Math.round(value%multiple);
        if (rem <= (multiple/2)) {
            return Math.round(value-rem);
        } else {
            return Math.round(value+multiple-rem);
        }
    }
};

module.exports = UnitUtil;
