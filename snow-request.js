/**
  * Core part of npm. Deals directly with making the requests to snow-forecast as
  * well as parsing the returned JSON and creating the relevant object
  **/
var SnowRequest = function() {
  var snowRequest = {};
  var request = require('request');
  var cheerio = require('cheerio');
  var TimeUtil = require('./time-util.js');
  var Elevation = require('./elevation.js');
  var coreURL = 'http://www.snow-forecast.com/resorts/';
  var MAX_CELLS = 18;

  /**
  * Fires off a specific request to snow-forecast and passes response to callback
  *   url: The generated url
  *   cb: Callback to pass response to
  */
  function pMakeRequest(url, cb){
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
  * _name: Resort name
  * issued: Time the forecast was issued
  * elev: Elevation
  * _url: URL
  * cb: Callback function to pass completed JSON object to.
  */
  function pBuildForecast($, _name, issued, elev, _url, cb) {
    //Get various forecast information containers
    var firstTime = $($('table tr.lar.hea2 td span.tiny.en')[0]).text();
    var snowForecast = $('span.snow');
    var rainForecast = $('span.rain');
    var freezingLevel = $('span.heightfl');
    var winds = $('table tr.winds td');
    var summary = $('table tr.med.sum td');

    //Create forecast object, and init forecast array for later
    var forecastObj = {
        name: _name,
        url: _url,
        issuedDate: issued[0], //issued[0] is date forecast was issued
        elevation: elev,
        forecast: []
    };

    var forecastArr = [];
    //Loop over forecasts, get relevant information for each and push to temp array
    for(var i = 0; i < MAX_CELLS; i++){
       forecastArr.push({
            time: TimeUtil.getTime(TimeUtil.getTimeOffset(firstTime), issued[1], i), //issued[1] is startDay
            wind: $(winds[i]).text(),
            summary: $(summary[i]).text(),
            snow: $(snowForecast[i]).text(),
            rain: $(rainForecast[i]).text(),
            freezingLevel: $(freezingLevel[i]).text()
        });
    }
    forecastObj.forecast = forecastArr;
    cb(forecastObj);
  }

  /*
  * PUBLIC
  * Method used to set the parsing in motion.
  * resortName: Name of resort
  * elevation: The elevation we should use for the forecast
  * cb: Callback to fire with a response.
  */
  snowRequest.parseResort = function(resortName, elevation, cb){
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

      //Extrapolate time-relevant information needed to build forecast, and build object.
      var issued = $('div.forecast-mid-header em nobr').text();
      var startDay = $($('table tr.day-names td')[0]).text();
      var match = issued.match(/^\d+/);
      var time = [];
      var timeIndex = issued.indexOf(match[0]) + match[0].length;
      time.push(issued.substr(issued.indexOf(match[0]), match[0].length));
      time.push(issued.substr(timeIndex, timeIndex+2));
      time.push(issued.substr(timeIndex+3).split(/[\s]+/));

      pBuildForecast($, resortName, [issued, startDay], elevation, url, function(obj){
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
