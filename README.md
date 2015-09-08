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
  issuedDate: "1pm 03 Aug 2015",
  elevation: "top",
  units: "metric",
  forecast: [
    {
      date: '3rd Aug 15',
      time: "Monday PM",
      summary: "light snow",
      wind: 15,
      snow: 4,
      rain: 0,
      freezingLevel: 3100,
      minTemp: -4,
      maxTemp: -4
    },
    {
      date: '3rd Aug 15',
      time: "Monday night",
      summary: "light snow",
      wind: 15,
      snow: 5,
      rain: 0,
      freezingLevel: 2800,
      minTemp: -6,
      maxTemp: -5
    },
    {
      date: '4th Aug 15',
      time: "Tuesday AM",
      summary: "snow shwrs",
      wind: 15,
      snow: 0,
      rain: 0,
      freezingLevel: 3600,
      minTemp: -5,
      maxTemp: -1
    },
    {
      date: '4th Aug 15',
      time: "Tuesday PM",
      summary: "snow shwrs",
      wind: 10,
      snow: 0,
      rain: 0,
      freezingLevel: 3600,
      minTemp: -1,
      maxTemp: 1
    },
    {
      date: '4th Aug 15',
      time: "Tuesday night",
      summary: "light snow",
      wind: 25,
      snow: 5,
      rain: 0,
      freezingLevel: 3000,
      minTemp: -5,
      maxTemp: -2
    },
    {
      date: '5th Aug 15',
      time: "Wednesday AM",
      summary: "heavy snow",
      wind: 35,
      snow: 13,
      rain: 0,
      freezingLevel: 2850,
      minTemp: -5,
      maxTemp: -5
    },
    {
      date: '5th Aug 15',
      time: "Wednesday PM",
      summary: "heavy snow",
      wind: 40,
      snow: 15,
      rain: 0,
      freezingLevel: 2450,
      minTemp: -7,
      maxTemp: -5
    },
    {
      date: '5th Aug 15',
      time: "Wednesday night",
      summary: "heavy snow",
      wind: 30,
      snow: 98,
      rain: 0,
      freezingLevel: 2400,
      minTemp: -9,
      maxTemp: -8
    },
    {
      date: '6th Aug 15',
      time: "Thursday AM",
      summary: "heavy snow",
      wind: 25,
      snow: 58,
      rain: 0,
      freezingLevel: 2750,
      minTemp: -8,
      maxTemp: -6
    },
    {
      date: '6th Aug 15',
      time: "Thursday PM",
      summary: "heavy snow",
      wind: 45,
      snow: 36,
      rain: 0,
      freezingLevel: 2900,
      minTemp: -5,
      maxTemp: -5
    },
    {
      date: '6th Aug 15',
      time: "Thursday night",
      summary: "heavy snow",
      wind: 45,
      snow: 128,
      rain: 0,
      freezingLevel: 1900,
      minTemp: -12,
      maxTemp: -5
    },
    {
      date: '7th Aug 15',
      time: "Friday AM",
      summary: "heavy snow",
      wind: 40,
      snow: 32,
      rain: 0,
      freezingLevel: 1850,
      minTemp: -13,
      maxTemp: -12
    },
    {
      date: '7th Aug 15',
      time: "Friday PM",
      summary: "heavy snow",
      wind: 35,
      snow: 21,
      rain: 0,
      freezingLevel: 2050,
      minTemp: -11,
      maxTemp: -11
    },
    {
      date: '7th Aug 15',
      time: "Friday night",
      summary: "heavy snow",
      wind: 30,
      snow: 32,
      rain: 0,
      freezingLevel: 1600,
      minTemp: -14,
      maxTemp: -12
    },
    {
      date: '8th Aug 15',
      time: "Saturday AM",
      summary: "light snow",
      wind: 30,
      snow: 3,
      rain: 0,
      freezingLevel: 1900,
      minTemp: -14,
      maxTemp: -12
    },
    {
      date: '8th Aug 15',
      time: "Saturday PM",
      summary: "light snow",
      wind: 25,
      snow: 3,
      rain: 0,
      freezingLevel: 2000,
      minTemp: -11,
      maxTemp: -11
    },
    {
      date: '8th Aug 15',
      time: "Saturday night",
      summary: "light snow",
      wind: 30,
      snow: 4,
      rain: 0,
      freezingLevel: 1850,
      minTemp: -12,
      maxTemp: -12
    },
    {
      date: '9th Aug 15',
      time: "Sunday AM",
      summary: "light snow",
      wind: 25,
      snow: 3,
      rain: 0,
      freezingLevel: 2150,
      minTemp: -11,
      maxTemp: -10
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
