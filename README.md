# snow-forecast-sfr
Source code for the npm module that scraps snow-forecast.com. This is an unofficial scraper.

## Introduction
Teach your server HTML.

```js
var snow = require('snow-forecast-sfr');

snow.parseResort('Tignes', 'mid', function(json){
      //json contains the forecast JSON
});
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

Currently this is used by [Niseko Pow](www.nisekopow.com). If you do use this please let us know and we'll put your name up here.

## Our Dependencies

We rely on the following npm modules:
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Request](https://github.com/request/request)


## Future Features

We have a few ideas but we would love to hear any you encounter in. Feel free to raise an issue and let us know :)


