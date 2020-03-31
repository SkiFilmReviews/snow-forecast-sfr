# snow-forecast-sfr - V2.0.0 [![Build Status](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr.svg?branch=master)](https://travis-ci.org/SkiFilmReviews/snow-forecast-sfr)
Source code for the npm module that scrapes snow-forecast.com. This is an unofficial scraper.

## Introduction
Enough chit-chat, just show me how to use it in 5 lines.

```js
const snow = require('snow-forecast-sfr').default;

snow.parseResort('Tignes', 'mid', function(json){
      //json contains the forecast JSON
});
```

The module is also fully typed so you can also do the following:
```typescript
import SnowRequest, { IForecast } from 'snow-forecast-sfr';

SnowRequest.parseResort('Tignes', 'mid', (json: IForecast) => {
  //json contains the forecast JSON
}, { inMetric: false });
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

## V1 -> V2 migration guide

V2 is a lot smaller and is now fully typed with typescript. We tried to avoid any breaking changes but they are as follows:

### Typescript compatible

Comes bundled with all the types ready to use in any of your typescript projects.

### If you use require

You need to add .default to the end of your require statement:

```js
const snow = require('snow-forecast-sfr').default;
```

### The date per forecast cell is now different

We were creating our own hybrid date to mimic snow-forecast.com and we relied on moment to do that. We've removed the moment dependency (making this module a lot smaller) and are just using the in built .toDateString()

Your JSON before:
```json
{
  name: "Valle-Nevado",
  url: "https://www.snow-forecast.com/resorts//6day/top",
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
      maxTemp: -13,
      windChill: -25
    }
    // Other forecasts removed for brevity
  ]
}  
```

Your JSON now:

```json
{
  name: "Valle-Nevado",
  url: "https://www.snow-forecast.com/resorts/Valle-Nevado/6day/top",
  issuedDate: "7am 04 Jun 2016",
  elevation: "top",
  units: "metric",
  forecast: [
    {
      date: "Sat Jun 04 2016",
      time: "Saturday AM",
      summary: "snow shwrs",
      wind: 15,
      windDirection: "NW",
      snow: 4,
      rain: 0,
      freezingLevel: 1750,
      minTemp: -16,
      maxTemp: -13,
      windChill: -25
    }
    // Other forecasts removed for brevity
  ]
}  
```

## Sample JSON

```json
{
  name: 'Valle-Nevado',
  url: 'https://www.snow-forecast.com/resorts/Valle-Nevado/6day/mid',
  issuedDate: '2am 31 Mar 2020',
  elevation: 'mid',
  units: 'imperial',
  forecast: [
    {
      date: 'Tue Mar 31 2020',
      time: 'Tuesday AM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14900,
      minTemp: 48,
      maxTemp: 50,
      windChill: 8
    },
    {
      date: 'Tue Mar 31 2020',
      time: 'Tuesday PM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15400,
      minTemp: 48,
      maxTemp: 50,
      windChill: 8
    },
    {
      date: 'Tue Mar 31 2020',
      time: 'Tuesday night',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14900,
      minTemp: 46,
      maxTemp: 48,
      windChill: 7
    },
    {
      date: 'Wed Apr 01 2020',
      time: 'Wednesday AM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14400,
      minTemp: 46,
      maxTemp: 48,
      windChill: 7
    },
    {
      date: 'Wed Apr 01 2020',
      time: 'Wednesday PM',
      summary: 'clear',
      wind: 10,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14900,
      minTemp: 48,
      maxTemp: 50,
      windChill: 8
    },
    {
      date: 'Wed Apr 01 2020',
      time: 'Wednesday night',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15300,
      minTemp: 48,
      maxTemp: 52,
      windChill: 9
    },
    {
      date: 'Thu Apr 02 2020',
      time: 'Thursday AM',
      summary: 'some clouds',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15600,
      minTemp: 52,
      maxTemp: 55,
      windChill: 11
    },
    {
      date: 'Thu Apr 02 2020',
      time: 'Thursday PM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 16100,
      minTemp: 54,
      maxTemp: 55,
      windChill: 12
    },
    {
      date: 'Thu Apr 02 2020',
      time: 'Thursday night',
      summary: 'clear',
      wind: 0,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15700,
      minTemp: 52,
      maxTemp: 54,
      windChill: 11
    },
    {
      date: 'Fri Apr 03 2020',
      time: 'Friday AM',
      summary: 'clear',
      wind: 0,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15400,
      minTemp: 52,
      maxTemp: 54,
      windChill: 11
    },
    {
      date: 'Fri Apr 03 2020',
      time: 'Friday PM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 15700,
      minTemp: 50,
      maxTemp: 54,
      windChill: 9
    },
    {
      date: 'Fri Apr 03 2020',
      time: 'Friday night',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14900,
      minTemp: 48,
      maxTemp: 50,
      windChill: 9
    },
    {
      date: 'Sat Apr 04 2020',
      time: 'Saturday AM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14600,
      minTemp: 48,
      maxTemp: 48,
      windChill: 8
    },
    {
      date: 'Sat Apr 04 2020',
      time: 'Saturday PM',
      summary: 'clear',
      wind: 10,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 14400,
      minTemp: 45,
      maxTemp: 48,
      windChill: 5
    },
    {
      date: 'Sat Apr 04 2020',
      time: 'Saturday night',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 13800,
      minTemp: 43,
      maxTemp: 45,
      windChill: 5
    },
    {
      date: 'Sun Apr 05 2020',
      time: 'Sunday AM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 13100,
      minTemp: 41,
      maxTemp: 45,
      windChill: 3
    },
    {
      date: 'Sun Apr 05 2020',
      time: 'Sunday PM',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 13500,
      minTemp: 43,
      maxTemp: 43,
      windChill: 3
    },
    {
      date: 'Sun Apr 05 2020',
      time: 'Sunday night',
      summary: 'clear',
      wind: 5,
      windDirection: '',
      snow: 0,
      rain: 0,
      freezingLevel: 13600,
      minTemp: 43,
      maxTemp: 45,
      windChill: 5
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
* Remote server error - This can be due to a 404 or because we were unable to connect to snow-forecast.com. Check whether the network is operating properly. Alternatively, the site may be down.
* Parse error - The parsing has failed. This should never happen.
* JSON Construction error - We were unable to build the forecast. This should never happen.

### Caveats

This is an unofficial module, and thus if snow-forecast decide to change the structure of their DOM then this will most likely break. We'll do our best to get it back up to scratch but caution beware. This issue affects all scrapers though.

## Testing

In order to run the suite of jest tests run the following code:

```js
yarn test
```


## Our Dependencies

We rely on the following npm modules:
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Bent](https://github.com/mikeal/bent)

## Contributing

We love having people help us out. Please feel free to open an issue or open a PR. To make sure your PR is merge ready please run the following commands and commit any changes:

```js
yarn format
yarn lint --fix
```

If you have no more linting issues then make sure all tests run like so:

```js
yarn test
```

And create the PR! :)

## Future Features

We have a few ideas but we would love to hear any you encounter in. Feel free to raise an issue and let us know :)
