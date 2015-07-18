# snow-forecast-sfr - V1.1.1 [![Build Status](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr.svg?branch=master)](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr)
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
If it isn't expected to snow and/or rain then a - is input there. Otherwise the numerical value displayed on the site appears.

```js
{
    name: "Valle-Nevado",
    url: "http://www.snow-forecast.com/resorts/Valle-Nevado/6day/top",
    issuedDate: "1pm 12 Jul 2015",
    elevation: "top",
    units: "metric",
    forecast: [
        {
            time: "Sunday PM",
            summary: "heavy snow",
            wind: 25,
            snow: 28,
            rain: 0,
            freezingLevel: 2000
        },
        {
            time: "Sunday night",
            summary: "heavy snow",
            wind: 10,
            snow: 60,
            rain: 0,
            freezingLevel: 1600
        },
        {
            time: "Monday AM",
            summary: "snow shwrs",
            wind: 10,
            snow: 3,
            rain: 0,
            freezingLevel: 1700
        },
        {
            time: "Monday PM",
            summary: "snow shwrs",
            wind: 20,
            snow: 2,
            rain: 0,
            freezingLevel: 1600
        },
        {
            time: "Monday night",
            summary: "snow shwrs",
            wind: 0,
            snow: 2,
            rain: 0,
            freezingLevel: 1050
        },
        {
            time: "Tuesday AM",
            summary: "clear",
            wind: 5,
            snow: 0,
            rain: 0,
            freezingLevel: 1900
        },
        {
            time: "Tuesday PM",
            summary: "clear",
            wind: 10,
            snow: 0,
            rain: 0,
            freezingLevel: 1900
        },
        {
            time: "Tuesday night",
            summary: "clear",
            wind: 0,
            snow: 0,
            rain: 0,
            freezingLevel: 1700
        },
        {
            time: "Wednesday AM",
            summary: "snow shwrs",
            wind: 10,
            snow: 0,
            rain: 0,
            freezingLevel: 2350
        },
        {
            time: "Wednesday PM",
            summary: "light snow",
            wind: 20,
            snow: 1,
            rain: 0,
            freezingLevel: 2100
        },
        {
            time: "Wednesday night",
            summary: "light snow",
            wind: 5,
            snow: 1,
            rain: 0,
            freezingLevel: 2050
        },
        {
            time: "Thursday AM",
            summary: "some clouds",
            wind: 10,
            snow: 0,
            rain: 0,
            freezingLevel: 3100
        },
        {
            time: "Thursday PM",
            summary: "some clouds",
            wind: 10,
            snow: 0,
            rain: 0,
            freezingLevel: 3150
        },
        {
            time: "Thursday night",
            summary: "clear",
            wind: 10,
            snow: 0,
            rain: 0,
            freezingLevel: 2900
        },
        {
            time: "Friday AM",
            summary: "clear",
            wind: 20,
            snow: 0,
            rain: 0,
            freezingLevel: 3350
        },
        {
            time: "Friday PM",
            summary: "clear",
            wind: 25,
            snow: 0,
            rain: 0,
            freezingLevel: 3150
        },
        {
            time: "Friday night",
            summary: "clear",
            wind: 25,
            snow: 0,
            rain: 0,
            freezingLevel: 2500
        },
        {
            time: "Saturday AM",
            summary: "some clouds",
            wind: 25,
            snow: 0,
            rain: 0,
            freezingLevel: 2750
        }
    ]
}
```

## Installation
`npm install snow-forecast-sfr`

### API

parseResort takes three parameters, the name of the resort (as is found on snow-forecast.com), the elevation (low, mid or top), a callback where you specify what to do with the returned object and an options object where you can specify the units.

### Types of Errors
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


## Future Features

We have a few ideas but we would love to hear any you encounter in. Feel free to raise an issue and let us know :)
