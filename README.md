# snow-forecast-sfr
Source code for the npm module that scraps snow-forecast.com. This is an unofficial scraper.

## Introduction
Enough chit-chat, just show me how to use it in 5 lines.

```js
var snow = require('snow-forecast-sfr');

snow.parseResort('Tignes', 'mid', function(json){
      //json contains the forecast JSON
});
```

## Sample JSON
If it isn't expected to snow and/or rain then a - is input there. Otherwise the numerical value displayed on the site appears.

```javascript
{
  name: "NisekoAnnpuriKokusai",
  url: "http://www.snow-forecast.com/resorts/NisekoAnnpuriKokusai/6day/top",
  issuedDate: "2pm 05 Jul 2015",
  elevation: "top",
  forecast: [
  {
      time: "Sunday PM",
      wind: "15",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3200"
  },
  {
      time: "Sunday night",
      wind: "15",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3350"
  },
  {
      time: "Monday AM",
      wind: "5",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3300"
  },
  {
      time: "Monday PM",
      wind: "10",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3450"
  },
  {
      time: "Monday night",
      wind: "25",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3600"
  },
  {
      time: "Tuesday AM",
      wind: "55",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3750"
  },
  {
      time: "Tuesday PM",
      wind: "30",
      summary: "rain shwrs",
      snow: "-",
      rain: "1",
      freezingLevel: "3750"
  },
  {
      time: "Tuesday night",
      wind: "25",
      summary: "rain shwrs",
      snow: "-",
      rain: "1",
      freezingLevel: "3450"
  },
  {
      time: "Wednesday AM",
      wind: "15",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3400"
  },
  {
      time: "Wednesday PM",
      wind: "10",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3400"
  },
  {
      time: "Wednesday night",
      wind: "5",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3500"
  },
  {
      time: "Thursday AM",
      wind: "5",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3750"
  },
  {
      time: "Thursday PM",
      wind: "0",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3900"
  },
  {
      time: "Thursday night",
      wind: "10",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "4000"
  },
  {
      time: "Friday AM",
      wind: "10",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3950"
  },
  {
      time: "Friday PM",
      wind: "15",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3850"
  },
  {
      time: "Friday night",
      wind: "20",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3950"
  },
  {
      time: "Saturday AM",
      wind: "20",
      summary: "clear",
      snow: "-",
      rain: "-",
      freezingLevel: "3900"
  }
  ]
}
```

## Installation
`npm install snow-forecast-sfr`

### API

parseResort takes three parameters, the name of the resort (as is found on snow-forecast.com), the elevation (low, mid or top) and a callback where you specify what to do with the returned object.

### Types of Errors
* Invalid page 404 - snow-forecast.com returned a 404, usually because the resort name you gave differs to how it's used on snow-forecast.com
* Remote server error - Unable to connect to snow-forecast.com. Check whether the network is operating properly. Alternatively, the site may be down.
* Parse error - The parsing has failed. This should never happen.
* JSON Construction error - We were unable to build the forecast. This should never happen.

### Caveats

This is an unofficial module, and thus if snow-forecast decide to change the structure of their DOM then this will most likely break. We'll do our best to get it back up to scratch but caution beware. This issue affects all scrapers though.

## Who uses this

Currently this is used by [Niseko Pow](http://www.nisekopow.com). If you do use this please let us know and we'll put your name up here.

## Our Dependencies

We rely on the following npm modules:
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Request](https://github.com/request/request)


## Future Features

We have a few ideas but we would love to hear any you encounter in. Feel free to raise an issue and let us know :)
