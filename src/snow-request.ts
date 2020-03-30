import bent from 'bent';
import cheerio from 'cheerio';
import {
  IForecast,
  IForecastCell,
  IForecastRequest,
  IParseOptions,
  IRequestError,
  ISnowRequest, TDays,
  TElevation, TResortName, TSnowRequestError,
  TSnowRequestMessage,
  TUrl,
  TWindDirection,
} from './types';

const stringStream = bent('string');

const TimeUtil = require('./time-util.js');
const UnitUtil = require('./unit-util.js');
const Elevation = require('./elevation.js');


const SnowRequest = function(): ISnowRequest {
  const coreURL = 'http://www.snow-forecast.com/resorts/';
  const MAX_CELLS = 18;
  let unitsInMetric = true;

  // Fires off a specific request to snow-forecast and passes response to callback
  async function pMakeRequest(url: TUrl, cb: any, opts?: IParseOptions) {
    try {
      const response = await stringStream(url);
      unitsInMetric = !opts || typeof opts.inMetric === 'undefined' ? true : opts.inMetric;

      try {
        if (response.length < 1500 && response.indexOf('The page you were looking for doesn\'t exist') > -1) {
          return cb([
            'Invalid page(404)',
            'Unable to find relevant resort forecast, ' + 'please check the spelling and try again',
            url,
          ]);
        }
        const $: CheerioStatic = cheerio.load(response); //Load html using cheerio for parsing
        cb($);
      } catch (ex) {
        cb(['Parse error', ex, url]);
      }
    } catch (error) {
      return cb(['Remote server error', 'Unable to get response from snow-forecast' + error, url]);
    }
  }

  // Helper method to build error JSON object in case something goes wrong
  function pBuildErrorJSON(error: TSnowRequestError, message: TSnowRequestMessage, url: TUrl): IRequestError {
    return {
      error,
      message,
      url,
    };
  }

  // Helper method to build forecast JSON object
  function pBuildForecast($: CheerioStatic, forecastOpt: IForecastRequest, cb: any) {
    const firstTime = $($('.forecast-table-time__period')[0]).text();
    const snowForecast = $('span.snow');
    const rainForecast = $('span.rain');
    const freezingLevel = $('span.heightfl');
    const winds = $('table tr[data-row="wind"] .forecast-table-wind__container svg text');

    const windChillTempContainer = $('table tr[data-row="temperature-chill"]');
    const maxTempContainer = $('table tr[data-row="temperature-max"]');
    const minTempContainer = $('table tr[data-row="temperature-min"]');

    const maxTemp = $(maxTempContainer).find('span.temp');
    const minTemp = $(minTempContainer).find('span.temp');
    const windChill = $(windChillTempContainer).find('span.temp');
    const summary = $('table tr[data-row="phrases"] span');

    //Create forecast object, and init forecast array for later
    const forecastObj: IForecast = {
      name: forecastOpt.resort,
      url: forecastOpt.url,
      issuedDate: forecastOpt.issuedDate,
      elevation: forecastOpt.elevation,
      units: unitsInMetric ? 'metric' : 'imperial',
      forecast: [],
    };

    const forecastArr: [IForecastCell?] = [];
    //Loop over forecasts, get relevant information for each and push to temp array
    for (let i = 0; i < MAX_CELLS; i++) {
      let cellObj: IForecastCell = {
        date: TimeUtil.getDay(forecastOpt.lastUpdateDate, forecastOpt.startDay, TimeUtil.getTimeOffset(firstTime), i),
        time: TimeUtil.getTime(TimeUtil.getTimeOffset(firstTime), forecastOpt.startDay, i), //issued[1] is startDay
        summary: $(summary[i]).text(),
        wind: parseInt($(winds[i]).text(), 10),
        windDirection: pGetWindDirection($, winds[i]),
        snow: parseInt($(snowForecast[i]).text(), 10) || 0,
        rain: parseInt($(rainForecast[i]).text(), 10) || 0,
        freezingLevel: parseInt($(freezingLevel[i]).text(), 10),
        minTemp: parseInt($(minTemp[i]).text(), 10),
        maxTemp: parseInt($(maxTemp[i]).text(), 10),
        windChill: parseInt($(windChill[i]).text(), 10), // TODO formatNumber helper with default
      };

      //If units requested isn't what's returned, convert
      if (forecastOpt.isMetric !== unitsInMetric) {
        cellObj = pConvertUnits(cellObj, unitsInMetric);
      }
      forecastArr.push(cellObj);
    }
    forecastObj.forecast = forecastArr;
    return cb(forecastObj);
  }

  /*
   * Helper method that finds if a wind cell has an image with an alternate text
   * value. This is used as it is the only place where we can get the wind direction
   * from.
   */
  function pGetWindDirection($: CheerioStatic, cell: CheerioElement): TWindDirection {
    const img = $(cell).find('img');
    const MAX_DESC_PARTS = 2;

    if (!img || img.length === 0) {
      return '';
    }

    const imageCellAlt = $(img[0]).attr('alt');
    //We don't want the speed just direction, so split string and get last part
    if (imageCellAlt && imageCellAlt.split(' ').length == MAX_DESC_PARTS) {
      return imageCellAlt.split(' ')[1] as TWindDirection;
    }

    return '';
  }

  // Simple method that converts all relevant fields to either metric or imperial.
  function pConvertUnits(obj: IForecastCell, toMetric: boolean): IForecastCell {
    if (toMetric) {
      obj.wind = UnitUtil.speedToMetric(obj.wind);
      obj.snow = UnitUtil.volumeToMetric(obj.snow) || 0;
      obj.rain = UnitUtil.volumeToMetric(obj.rain / 10) || 0;
      obj.freezingLevel = UnitUtil.distanceToMetric(obj.freezingLevel);
      obj.minTemp = UnitUtil.temperatureToMetric(obj.minTemp);
      obj.maxTemp = UnitUtil.temperatureToMetric(obj.maxTemp);
    } else {
      obj.wind = UnitUtil.speedToImperial(obj.wind);
      obj.snow = UnitUtil.volumeToImperial(obj.snow) || 0;
      obj.rain = UnitUtil.volumeToImperial(obj.rain / 10) || 0;
      obj.freezingLevel = UnitUtil.distanceToImperial(obj.freezingLevel);
      obj.minTemp = UnitUtil.temperatureToImperial(obj.minTemp);
      obj.maxTemp = UnitUtil.temperatureToImperial(obj.maxTemp);
    }
    return obj;
  }

  //PUBLIC: Method used to set the parsing in motion.
  const parseResort = function(resort: TResortName, elevation: TElevation, cb: any, opts?: IParseOptions): IRequestError | IForecast | undefined {
    if (arguments.length < 3) {
      return pBuildErrorJSON(
        'Insufficient parameters',
        'Please pass the resort, elevation, callback and if you wish the options object into the method',
        '',
      );
    }

    const url = coreURL + resort + '/6day/' + elevation; //Build the url

    pMakeRequest(url, function($: CheerioStatic) {
      if ($ instanceof Array) {
        //An error has occurred, feedback info to user.
        cb(pBuildErrorJSON($[0], $[1], $[2]));
        return;
      }

      //Find out if response is in metric or not.
      const isMetric = $('.deg-c input').attr('checked') === 'checked';
      //Extrapolate time-relevant information needed to build forecast, and build object.
      const issuedDate = TimeUtil.fixIssueDateFormat(
        $($('.location-issued__no-wrap')[5]).text() + $($('.location-issued__no-wrap')[6]).text(),
      );

      let firstTime = $($('.forecast-table-time__period')[0]).text();
      let startDay = $($('.forecast-table-days__name')[0]).text() as TDays;

      const lastUpdateDate = $($('.location-issued__no-wrap')[6]).text();
      //if the first column starts from 'night', first column would not display day.
      if (firstTime === 'night') {
        startDay = TimeUtil.getPrevDay(startDay);
      }

      const forecastRequest: IForecastRequest = {
        resort,
        elevation,
        url,
        issuedDate,
        lastUpdateDate,
        startDay,
        isMetric,
      };

      const match = issuedDate.match(/^\d+/);
      const time = [];
      const timeIndex = issuedDate.indexOf(match[0]) + match[0].length;
      time.push(issuedDate.substr(issuedDate.indexOf(match[0]), match[0].length));
      time.push(issuedDate.substr(timeIndex, timeIndex + 2));
      time.push(issuedDate.substr(timeIndex + 3).split(/[\s]+/));

      pBuildForecast($, forecastRequest, function(obj: IForecast) {
        if (!obj) {
          return cb(pBuildErrorJSON('JSON Construction Error', 'Internal error occurred, please try again', url));
        }
        return cb(obj);
      });
    });
  };

  return {
    parseResort,
  };
};

export default SnowRequest;
