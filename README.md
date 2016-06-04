# snow-forecast-sfr - V1.3 [![Build Status](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr.svg?branch=master)](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr)
Source code for the npm module that scrapes snow-forecast.com. This is an unofficial scraper.

## Introduction
Enough chit-chat, just show me how to use it in 5 lines.

```js
var snow = require('snow-forecast-sfr');

snow.parseResort('Tignes', 'mid', function(json){
      //json contains the forecast JSON
});
```

## Options

Currently snow-forecast decides whether to show units in metric or imperial based
on where the request is coming from. If you need to specify whether the response
should be in imperial or metric units simply do the following:

```js
snow.parseResort('Tignes', 'mid', function(json){
      //json contains the forecast JSON
}, { isMetric: false });
```

By passing in an options hash with the value for the isMetric key set to true for
metric, or false for imperial.


## Sample JSON

```js
{
  name: "Valle-Nevado",
  url: "http://www.snow-forecast.com/resorts/Valle-Nevado/6day/top",
  issuedDate: "7am 04 Jun 2016",
  elevation: "top",
  units: "metric",
  forecast: [
    {
      date: "4th Jun 16",
      time: "Saturday AM",
      summary: "snow shwrs",
      wind: 15,
      windDirection: "NW",
      snow: 4,
      rain: 0,
      freezingLevel: 1750,
      minTemp: -16,
      maxTemp: -13
    },
    {
      date: "4th Jun 16",
      time: "Saturday PM",
      summary: "snow shwrs",
      wind: 15,
      windDirection: "NW",
      snow: 0,
      rain: 0,
      freezingLevel: 1650,
      minTemp: -13,
      maxTemp: -12
    },
    {
      date: "4th Jun 16",
      time: "Saturday night",
      summary: "snow shwrs",
      wind: 15,
      windDirection: "NNW",
      snow: 1,
      rain: 0,
      freezingLevel: 1350,
      minTemp: -16,
      maxTemp: -15
    },
    {
      date: "5th Jun 16",
      time: "Sunday AM",
      summary: "snow shwrs",
      wind: 10,
      windDirection: "WNW",
      snow: 0,
      rain: 0,
      freezingLevel: 1750,
      minTemp: -16,
      maxTemp: -13
    },
    {
      date: "5th Jun 16",
      time: "Sunday PM",
      summary: "snow shwrs",
      wind: 5,
      windDirection: "WSW",
      snow: 0,
      rain: 0,
      freezingLevel: 1650,
      minTemp: -13,
      maxTemp: -13
    },
    {
      date: "5th Jun 16",
      time: "Sunday night",
      summary: "clear",
      wind: 10,
      windDirection: "E",
      snow: 0,
      rain: 0,
      freezingLevel: 1250,
      minTemp: -16,
      maxTemp: -14
    },
    {
      date: "6th Jun 16",
      time: "Monday AM",
      summary: "clear",
      wind: 5,
      windDirection: "SSW",
      snow: 0,
      rain: 0,
      freezingLevel: 2250,
      minTemp: -13,
      maxTemp: -9
    },
    {
      date: "6th Jun 16",
      time: "Monday PM",
      summary: "clear",
      wind: 5,
      windDirection: "SW",
      snow: 0,
      rain: 0,
      freezingLevel: 2200,
      minTemp: -9,
      maxTemp: -8
    },
    {
      date: "6th Jun 16",
      time: "Monday night",
      summary: "clear",
      wind: 0,
      windDirection: "NNE",
      snow: 0,
      rain: 0,
      freezingLevel: 2150,
      minTemp: -10,
      maxTemp: -9
    },
    {
      date: "7th Jun 16",
      time: "Tuesday AM",
      summary: "clear",
      wind: 10,
      windDirection: "WSW",
      snow: 0,
      rain: 0,
      freezingLevel: 2700,
      minTemp: -10,
      maxTemp: -6
    },
    {
      date: "7th Jun 16",
      time: "Tuesday PM",
      summary: "clear",
      wind: 10,
      windDirection: "WSW",
      snow: 0,
      rain: 0,
      freezingLevel: 2600,
      minTemp: -7,
      maxTemp: -6
    },
    {
      date: "7th Jun 16",
      time: "Tuesday night",
      summary: "clear",
      wind: 5,
      windDirection: "N",
      snow: 0,
      rain: 0,
      freezingLevel: 2350,
      minTemp: -9,
      maxTemp: -9
    },
    {
      date: "8th Jun 16",
      time: "Wednesday AM",
      summary: "clear",
      wind: 5,
      windDirection: "WNW",
      snow: 0,
      rain: 0,
      freezingLevel: 2900,
      minTemp: -9,
      maxTemp: -5
    },
    {
      date: "8th Jun 16",
      time: "Wednesday PM",
      summary: "clear",
      wind: 5,
      windDirection: "NNW",
      snow: 0,
      rain: 0,
      freezingLevel: 2550,
      minTemp: -8,
      maxTemp: -5
    },
    {
      date: "8th Jun 16",
      time: "Wednesday night",
      summary: "clear",
      wind: 10,
      windDirection: "N",
      snow: 0,
      rain: 0,
      freezingLevel: 2000,
      minTemp: -11,
      maxTemp: -10
    },
    {
      date: "9th Jun 16",
      time: "Thursday AM",
      summary: "some clouds",
      wind: 15,
      windDirection: "NNW",
      snow: 0,
      rain: 0,
      freezingLevel: 2650,
      minTemp: -10,
      maxTemp: -7
    },
    {
      date: "9th Jun 16",
      time: "Thursday PM",
      summary: "light snow",
      wind: 10,
      windDirection: "NNW",
      snow: 1,
      rain: 0,
      freezingLevel: 2050,
      minTemp: -10,
      maxTemp: -7
    },
    {
      date: "9th Jun 16",
      time: "Thursday night",
      summary: "mod. snow",
      wind: 15,
      windDirection: "NNW",
      snow: 7,
      rain: 0,
      freezingLevel: 2050,
      minTemp: -12,
      maxTemp: -11
    }
  ]
}
```

## Installation
`npm install snow-forecast-sfr`

### API

parseResort takes three parameters, the name of the resort (as is found on snow-forecast.com), the elevation ('low', 'mid' or 'top'), a callback where you specify what to do with the returned object and an optional options object where you can specify the units.

### Types of Errors
* Insufficient parameters - You haven't passed the proper number of parameters into the parseResort method.
* Invalid page 404 - snow-forecast.com returned a 404, usually because the resort name you gave differs to how it's used on snow-forecast.com
* Remote server error - Unable to connect to snow-forecast.com. Check whether the network is operating properly. Alternatively, the site may be down.
* Parse error - The parsing has failed. This should never happen.
* JSON Construction error - We were unable to build the forecast. This should never happen.

### Caveats

This is an unofficial module, and thus if snow-forecast decide to change the structure of their DOM then this will most likely break. We'll do our best to get it back up to scratch but caution beware. This issue affects all scrapers though.

## Testing

In order to run the suite of jasmine tests run the following code:

```js
npm test
```

## Who uses this

Currently this is used by [Niseko Pow](http://www.nisekopow.com). If you do use this please let us know and we'll put your name up here.

## Our Dependencies

We rely on the following npm modules:
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Request](https://github.com/request/request)
* [Moment](https://github.com/moment/moment/)

## Future Features

We have a few ideas but we would love to hear any you encounter in. Feel free to raise an issue and let us know :)
