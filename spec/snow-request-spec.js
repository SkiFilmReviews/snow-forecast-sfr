#!javascript
var sfr = require("../snow-request");
var request = new sfr();

describe("parsing a resort with incorrect parameters", function () {
  it("should return error when only given one parameter'", function(){
    var result = request.parseResort('NotAResort');
    expect(result.error).toBe('Insufficient parameters');
  });
  it("should return error when given two parameters'", function(){
    var result = request.parseResort('StillNotAResort', 'LOW');
    expect(result.error).toBe('Insufficient parameters');
  });
  it("should return error when given an incorrect elevation type'", function(done){
    var result = request.parseResort('StillNotAResort', 'SO TALL', function(result){
      expect(result.error).toBe('Invalid Elevation');
      done();
    });
  });
  it("should return error when given an invalid resort'", function(done){
    var result = request.parseResort('StillNotAResort', 'top', function(result){
      expect(result.error).toBe('Invalid page(404)');
      done();
    });
  });
  it("should return no error when given invalid options'", function(done){
    var result = request.parseResort('Valle-Nevado', 'top', function(result){
      expect(result.error).toBeFalsy();
      done();
    });
  });
});

describe("parsing Tignes at top should give valid JSON", function(){
  it("should have valid name in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.name).toBe('Tignes');
      done();
    });
  });
  it("should have valid url in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.url).toBe('http://www.snow-forecast.com/resorts/Tignes/6day/top');
      done();
    });
  });
  it("should have issued date in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.issuedDate).toBeTruthy();
      done();
    });
  });
  it("should have elevation in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.elevation).toBe('top');
      done();
    });
  });
  it("should have units (metric) in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.units).toBe('metric');
      done();
    }, {inMetric: true});
  });
  it("should have units (imperial) in object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.units).toBe('imperial');
      done();
    }, {inMetric: false});
  });
});

describe("parsing Tignes at top should return valid forecast objects", function(){
  it("should have forecast object with an array of 18 items", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.forecast).toBeTruthy();
      expect(result.forecast.length).toBe(18);
      done();
    });
  });
  it("should have time that is a string object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.forecast[0].time).toBeTruthy();
      expect(typeof result.forecast[0].time).toBe('string');
      done();
    });
  });
  it("should have summary that is a string object", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(result.forecast[1].summary).toBeTruthy();
      expect(typeof result.forecast[1].summary).toBe('string');
      done();
    });
  });
  it("should have wind that is an integer and >= 0", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[3].wind)).toBeFalsy();
      expect(result.forecast[3].wind >= 0).toBeTruthy();
      done();
    });
  });
  it("should have wind direction that is not an empty string and has no numbers", function(done){
      var result = request.parseResort('Tignes', 'top', function(result){
        expect(typeof result.forecast[3].windDirection === 'string').toBeTruthy();
        expect(result.forecast[3].windDirection.match(/\d+/g)).toBeNull();
        expect(result.forecast[3].windDirection.length > 0);
        done();
      });
  });
  it("should have rain that is an integer and >= 0", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[5].wind)).toBeFalsy();
      expect(result.forecast[5].rain >= 0).toBeTruthy();
      done();
    });
  });
  it("should have snow that is an integer and >= 0", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[7].snow)).toBeFalsy();
      expect(result.forecast[7].snow >= 0).toBeTruthy();
      done();
    });
  });
  it("should have a freezing level is an integer and >= 0", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[9].freezingLevel)).toBeFalsy();
      expect(result.forecast[9].freezingLevel >= 0).toBeTruthy();
      done();
    });
  });
  it("should have a min temp that is an integer", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[10].minTemp)).toBeFalsy();
      done();
    });
  });
  it("should have a max temp that is an integer", function(done){
    var result = request.parseResort('Tignes', 'top', function(result){
      expect(isNaN(result.forecast[10].maxTemp)).toBeFalsy();
      done();
    });
  });
});
