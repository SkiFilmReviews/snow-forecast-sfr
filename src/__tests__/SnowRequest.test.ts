import SnowRequest from "../SnowRequest";
import { IForecast } from '../types';

describe("Given the SnowRequest", () => {
  const request = SnowRequest();

  describe("- when parsing a non existent resort -", () => {
    it("should return error when given an invalid resort'", (done) => {
      request.parseResort('StillNotAResort', 'top', (result: IForecast) => {
        expect(result.error).toBe('Remote server error');
        done();
      });
    });
  });

  describe(" - when parsing a valid resort -", () => {
    it("should return no error", (done) => {
      request.parseResort('Valle-Nevado', 'top', (result: IForecast) => {
        expect(result.error).toBeFalsy();
        done();
      });
    });

    it("should have valid name in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.name).toBe('Tignes');
        done();
      });
    });

    it("should have valid url in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.url).toBe('https://www.snow-forecast.com/resorts/Tignes/6day/top');
        done();
      });
    });

    it("should have issued date in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.issuedDate).toBeTruthy();
        done();
      });
    });

    it("should have elevation in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.elevation).toBe('top');
        done();
      });
    });

    it("should have units (metric) in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.units).toBe('metric');
        done();
      }, {inMetric: true});
    });

    it("should have units (imperial) in object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.units).toBe('imperial');
        done();
      }, {inMetric: false});
    });

    it("should have forecast object with an array of 18 items", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.forecast).toBeTruthy();
        expect(result.forecast.length).toBe(18);
        done();
      });
    });

    it("should have time that is a string object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.forecast[0].time).toBeTruthy();
        expect(typeof result.forecast[0].time).toBe('string');
        done();
      });
    });

    it("should have summary that is a string object", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(result.forecast[1].summary).toBeTruthy();
        expect(typeof result.forecast[1].summary).toBe('string');
        done();
      });
    });

    it("should have wind that is an integer and >= 0", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[3].wind)).toBeFalsy();
        expect(result.forecast[3].wind >= 0).toBeTruthy();
        done();
      });
    });

    it("should have wind direction that is not an empty string and has no numbers", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(typeof result.forecast[3].windDirection === 'string').toBeTruthy();
        expect(result.forecast[3].windDirection.match(/\d+/g)).toBeNull();
        expect(result.forecast[3].windDirection.length > 0);
        done();
      });
    });

    it("should have rain that is an integer and >= 0", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[5].wind)).toBeFalsy();
        expect(result.forecast[5].rain >= 0).toBeTruthy();
        done();
      });
    });

    it("should have snow that is an integer and >= 0", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[7].snow)).toBeFalsy();
        expect(result.forecast[7].snow >= 0).toBeTruthy();
        done();
      });
    });

    it("should have a freezing level is an integer and >= 0", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[9].freezingLevel)).toBeFalsy();
        expect(result.forecast[9].freezingLevel >= 0).toBeTruthy();
        done();
      });
    });

    it("should have a min temp that is an integer", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[10].minTemp)).toBeFalsy();
        done();
      });
    });

    it("should have a max temp that is an integer", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[10].maxTemp)).toBeFalsy();
        done();
      });
    });

    it("should have a wind chill that is an integer", (done) => {
      request.parseResort('Tignes', 'top', (result: IForecast) => {
        expect(isNaN(result.forecast[10].windChill)).toBeFalsy();
        done();
      });
    });
  });
});
