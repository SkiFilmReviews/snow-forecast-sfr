/**
  * Core part of npm. Deals directly with making the requests to snow-forecast as
  * well as parsing the returned JSON and creating the relevant object
  **/
var SnowRequest = function() {
  var snowRequest = {};
  var request = require('request');
  var cheerio = require('cheerio');
  var TimeUtil = require('./time-util.js');
  var UnitUtil = require('./unit-util.js');
  var Elevation = require('./elevation.js');
  var coreURL = 'http://www.snow-forecast.com/resorts/';
  var unitsInMetric;
  var MAX_CELLS = 18;

  /**
  * Fires off a specific request to snow-forecast and passes response to callback
  *   url: The generated url
  *   cb: Callback to pass response to
  */
  function pMakeRequest(url, cb, opts){
    request(url, function(error, response, html){
      if(!error){
        try{
          var $ = cheerio.load(html); //Load html using cheerio for parsing
          cb($);
        } catch(ex){
          if(html.length < 1500 && html.indexOf('The page you were looking for doesn\'t exist') > -1){
            cb(['Invalid page(404)', 'Unable to find relevant resort forecast, ' +
              'please check the spelling and try again', url]);
          } else {
            cb(['Parse error', ex, url]);
          }
        }
      } else {
        cb(['Remote server error', 'Unable to get response from snow-forecast' + error, url]);
      }
    });
  }

  /**
  * Helper method to build error JSON object in case something goes wrong
  * error: Type of error
  * message: Additional information regarding the error
  * url: URL used to make request
  */
  function pBuildErrorJSON(error, message, url){
    return {
      error: error,
      message: message,
      url: url
    };
  }

  /**
  * Helper method to build forecast JSON object
  * $: The cheerio object which we use to extract the forecast data
  * forecastOpt: Hash object with following information:
  *  resort: Resort name
  *  url: URL of request
  *  elevation: Elevation requested
  *  issuedDate: Date that forecast was issued
  *  startDay: First day of forecast
  *  isMetric: Whether response is in metric units or not
  * cb: Callback function to pass completed JSON object to.
  */
  function pBuildForecast($, forecastOpt, cb) {
    //Get various forecast information containers
    var firstTime = $($('table tr.lar.hea2 td span.tiny.en')[0]).text();
    var snowForecast = $('span.snow');
    var rainForecast = $('span.rain');
    var freezingLevel = $('span.heightfl');
    var winds = $('table tr.winds td');
    var summary = $('table tr.med.sum td');

    //Create forecast object, and init forecast array for later
    var forecastObj = {
        name: forecastOpt.resort,
        url: forecastOpt.url,
        issuedDate: forecastOpt.issuedDate,
        elevation: forecastOpt.elevation,
        units: unitsInMetric ? 'metric' : 'imperial',
        forecast: []
    };

    var forecastArr = [];
    //Loop over forecasts, get relevant information for each and push to temp array
    for(var i = 0; i < MAX_CELLS; i++){
      var cellObj = {
        time: TimeUtil.getTime(TimeUtil.getTimeOffset(firstTime), forecastOpt.startDay, i), //issued[1] is startDay
        summary: $(summary[i]).text(),
        wind: parseInt($(winds[i]).text(), 10),
        snow: parseInt($(snowForecast[i]).text(), 10),
        rain: parseInt($(rainForecast[i]).text(), 10),
        freezingLevel: parseInt($(freezingLevel[i]).text(),10)
      };
      //If units requested isn't what's returned, convert
      if(forecastOpt.isMetric !== unitsInMetric){
        cellObj = pConvertUnits(cellObj, unitsInMetric);
      }
      forecastArr.push(cellObj);
    }
    forecastObj.forecast = forecastArr;
    cb(forecastObj);
  }

  /*
  * Simple method that converts all relevant fields to either metric or imperial.
  * obj
  *  The existing forecast object that contains all the fields
  * toMetric
  *  a boolean on whether to convert to metric or not.
  */
  function pConvertUnits(obj, toMetric){
    if(toMetric){
      obj.wind = UnitUtil.speedToMetric(obj.wind);
      obj.snow = UnitUtil.volumeToMetric(obj.snow) || 0;
      obj.rain = UnitUtil.volumeToMetric(obj.rain/10) || 0;
      obj.freezingLevel = UnitUtil.distanceToMetric(obj.freezingLevel);
    } else {
      obj.wind = UnitUtil.speedToImperial(obj.wind);
      obj.snow = UnitUtil.volumeToImperial(obj.snow) || 0;
      obj.rain = UnitUtil.volumeToImperial(obj.rain/10) || 0;
      obj.freezingLevel = UnitUtil.distanceToImperial(obj.freezingLevel);
    }
    return obj;
  }

  /*
  * Applies the options to the class if there are any, otherwise defaults them.
  * Currently only option is whether to display units in metric or imperial.
  * opts
  *  A hash of options. Currently only 'inMetric'
  */
  function pApplyOptions(opts){
    if(!opts){
      return;
    }
    unitsInMetric = opts.inMetric === undefined ? true : opts.inMetric;
  }

  /*
  * PUBLIC
  * Method used to set the parsing in motion.
  * resortName: Name of resort
  * elevation: The elevation we should use for the forecast
  * cb: Callback to fire with a response.
  * opts: Hash of available runtime option parameters
  */
  snowRequest.parseResort = function(resortName, elevation, cb, opts){
    pApplyOptions(opts);
    var url = coreURL + resortName + '/6day/' + elevation; //Build the url

    if(!Elevation.validate(elevation)){
      cb(pBuildErrorJSON('Invalid Elevation',
        'Elevation is incorrect, please use either: low, mid or top', url));
        return;
    }
    //Validation passed, let's make the request son.
    pMakeRequest(url, function($){
      if($ instanceof Array){ //An error has occurred, feedback info to user.
        cb(pBuildErrorJSON($[0], $[1], $[2]));
        return;
      }

      var forecastOptObj = { resort: resortName, elevation: elevation, url: url};

      //Find out if response is in metric or not.
      forecastOptObj.isMetric = $('.deg-c input').attr('checked') === 'checked';
      //Extrapolate time-relevant information needed to build forecast, and build object.
      var issued = TimeUtil.fixIssueDateFormat($('div.forecast-mid-header em nobr').text());
      forecastOptObj.issuedDate = issued;
      forecastOptObj.startDay = $($('table tr.day-names td')[0]).text();
      var match = issued.match(/^\d+/);
      var time = [];
      var timeIndex = issued.indexOf(match[0]) + match[0].length;
      time.push(issued.substr(issued.indexOf(match[0]), match[0].length));
      time.push(issued.substr(timeIndex, timeIndex+2));
      time.push(issued.substr(timeIndex+3).split(/[\s]+/));

      pBuildForecast($, forecastOptObj, function(obj){
        if(!obj){
          cb(pBuildErrorJSON("JSON Construction Error", "Internal error occurred, please try again", url));
          return;
        }
        cb(obj);
      });
    });
  };

  return snowRequest;
};

module.exports = SnowRequest;
