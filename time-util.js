/**
 * Utility module that helps us determine what the starting days/times for the
 * forecast are so the returned JSON object is correct. Works regardless of device's
 * timezone.
 */
var moment = require('moment');
TimeUtil = {
    times: ['AM', 'PM', 'night'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    currentDayOffset: 0,
    MIN_DAY_STRING_LEN: 4, //Sometimes the site cuts off the day name, need to check
    MAX_INDEX_CNT: 17, //Maximum columns with information in them

    /*
    * PUBLIC
    * Used to get the time that the information is relevant for.
    * startTime: The first time in the snow forecast.
    * startDay: The first day in the snow forecast.
    * index: Current index, ranges from 0 to MAX_INDEX_CNT(17).
    *
    * returns: Time of specified column of forecast data in: 'Monday AM' format
    */
    getTime: function(startTime, startDay, index){
        var timeDiff = (startTime+index) % this.times.length;
        var dayDiff = this.getDayOffset(startDay, startTime, index);

        if(index===this.MAX_INDEX_CNT){ //We've finished building an object, reset offset value.
          this.currentDayOffset = 0;
        }
        return this.days[dayDiff] + ' ' +this.times[timeDiff];
    },

    /*
    * PUBLIC
    * Helper method to return index of first time the forecast has.
    * startTime: The first time in the snow forecast.
    *
    * returns: index of start time
    */
    getTimeOffset: function(startTime){
      return this.times.indexOf(startTime);
    },

    /*
    * PUBLIC (probably shouldn't be...)
    * Helper method to return the correct index for the day of a specified
    * column.
    * startDay: The first day in the snow forecast.
    * startTime: The first time in the snow forecast.
    * index: Current index, ranges from 0 to MAX_INDEX_CNT(17).
    *
    * returns: dayOffset: index of current day for specified column of forecast data.
    */
    getDayOffset: function(startDay, startTime, index){
      var firstDayPos = this.days.indexOf(this.getCorrectDay(startDay)); //get position of first day

      //Black magic
      if(((startTime+index)/this.times.length)%1 === 0 && startTime+index !== 0){
        this.currentDayOffset++;
      }
      return (firstDayPos + this.currentDayOffset) % this.days.length;
    },

    /*
    * PUBLIC
    * Helper method that uses the Moment API to get the day of
    * the current forecast cell.
    * issuedDate: The date when the forecast was issued.
    * startDay: The first day in the snow forecast.
    * startTime: The first time in the snow forecast.
    * index: Current index, ranges from 0 to MAX_INDEX_CNT(17).
    *
    * returns: day: string object e.g. 8th Sep 2015
    */
    getDay: function(issuedDate, startDay, startTime, index){
      var offset = Math.floor((startTime + index)/this.times.length);
      return moment().add(offset, 'days').format("Do MMM YY");
    },

    /*
    * PUBLIC (probably shouldn't be...)
    * Helper method to determine whether the day we've been given is correctly
    * formatted. This is because snow forecast sometimes cuts off the day
    * (ie Mon instead of Monday)
    * day: The day to check
    *
    * returns: correctDay: The correctly formatted day to check against our index of days.
    */
    getCorrectDay: function(day){
      //If length of day is sufficient, just trim
      if(day.length > this.MIN_DAY_STRING_LEN){
        return day.split(" ")[0].trim();
      }
      //Otherwise, loop and find matching one from our array.
      for(var i = 0; i < this.days.length; i++){
        if(this.days[i].indexOf(day) > -1)
        {
          return this.days[i];
        }
      }
    },

    /*
    * PUBLIC
    * Cheerio returns us an oddly formatted string which the site uses to show
    * when the forecast was issued. In order to make it easier for developers to
    * manipulate, let's make sure we always deliver a consistent issued date.
    * issuedDate: the date we get from cheerio
    *
    * returns: a string ie: 2pm 07 Jul 2015
    */
    fixIssueDateFormat: function(issuedDate){
      var tmpDateArray = issuedDate.split(" ");
      var tmpDate = tmpDateArray.join('').match(/(\d+|[^\d]+)/g);

      return tmpDate[0] + tmpDate[1].trim() + ' ' + tmpDate[2] + ' ' + tmpDate[3].trim() +
        ' ' + tmpDate[4];
    }
};

module.exports = TimeUtil;
