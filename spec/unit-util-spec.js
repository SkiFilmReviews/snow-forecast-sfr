#!javascript
var unit = require("../unit-util");

describe("convert speed to metric units", function () {
  it("should convert 16 mph to 26 kph", function () {
    var speed = unit.speedToMetric(16);
    expect(speed).toBe(26);
  });
  it("should convert 25 mph to 16kph", function() {
    var speed = unit.speedToMetric(25);
    expect(speed).toBe(40);
  });
  it("should convert 16.2521mph to 26 kph", function() {
    var speed = unit.speedToMetric(16.2521);
    expect(speed).toBe(26);
  });
  it("should convert 73mph to 110kph", function() {
    var speed = unit.speedToMetric(73);
    expect(speed).toBe(117);
  });
  it("should convert 62mph to 100kph", function() {
    var speed = unit.speedToMetric(62);
    expect(speed).toBe(100);
  });
});

describe("convert speed to imperial units and round it to nearest multiple of five", function () {
  it("should convert 10 kph to 6 mph", function () {
    var speed = unit.speedToImperial(10);
    expect(speed).toBe(5);
  });
  it("should convert 25 kph to 15mph", function() {
    var speed = unit.speedToImperial(25);
    expect(speed).toBe(15);
  });
  it("should convert 23.2521 kph to 15 mph", function() {
    var speed = unit.speedToImperial(23.2521);
    expect(speed).toBe(15);
  });
  it("should convert 37.53920 kph to 25 mph", function() {
    var speed = unit.speedToImperial(37.53920);
    expect(speed).toBe(25);
  });
  it("should convert 50 kph to 30 mph", function() {
    var speed = unit.speedToImperial(50);
    expect(speed).toBe(30);
  });
  it("should convert 62 kph to 40 mph", function() {
    var speed = unit.speedToImperial(62);
    expect(speed).toBe(40);
  });
});

describe("converting ft to metres and rounding to nearest 50", function() {
  it("should return 50 when given 100", function() {
    var distance = unit.distanceToMetric(100);
    expect(distance).toBe(50);
  });
  it("should return 1500 when given 5000", function() {
    var distance = unit.distanceToMetric(5000);
    expect(distance).toBe(1500);
  });
  it("should return 1500 when given 4921.2598", function() {
    var distance = unit.distanceToMetric(4921.2598);
    expect(distance).toBe(1500);
  });
  it("should return 0 when given 50", function() {
    var distance = unit.distanceToMetric(50);
    expect(distance).toBe(0);
  });
});

describe("converting metres to ft and rounding to nearest 100", function() {
  it("should return 100 when given 30", function() {
    var distance = unit.distanceToImperial(30);
    expect(distance).toBe(100);
  });
  it("should return 4000 when given 1232.312", function() {
    var distance = unit.distanceToImperial(1232.312);
    expect(distance).toBe(4000);
  });
  it("should return 2300 when given 750", function() {
    var distance = unit.distanceToImperial(750);
    expect(distance).toBe(2500);
  });
  it("should return 4100 when given 1264", function() {
    var distance = unit.distanceToImperial(1264);
    expect(distance).toBe(4100);
  });
});

describe("rounding to nearest multiple", function() {
  it("should return 5 when given 7", function() {
    var rounded = unit.roundTo(5, 7);
    expect(rounded).toBe(5);
  });
  it("should return 10 when given 7.5", function() {
    var rounded = unit.roundTo(5, 7.5);
    expect(rounded).toBe(10);
  });
  it("should return 10 when given 7.6", function() {
    var rounded = unit.roundTo(5, 7.6);
    expect(rounded).toBe(10);
  });
  it("should return 0 when given -1", function() {
    var rounded = unit.roundTo(5, -1);
    expect(rounded).toBe(0);
  });
  it("should return 105 when given 103", function() {
    var rounded = unit.roundTo(105, 103);
    expect(rounded).toBe(105);
  });
});

describe("handling being given a non-numerical string", function() {
  it("should return NaN when given a non-numerical string", function() {
    var speed = unit.speedToImperial("sixteen");
    expect(speed).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var speed = unit.speedToMetric("sixteen");
    expect(speed).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var distance = unit.distanceToMetric("potato");
    expect(distance).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var distance = unit.distanceToImperial("beetlebug");
    expect(distance).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var rounded = unit.roundTo(5, "ten");
    expect(rounded).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var rounded = unit.roundTo("ten", 20);
    expect(rounded).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var temperature = unit.temperatureToMetric("bananarama");
    expect(temperature).toBeNaN();
  });
  it("should return NaN when given a non-numerical string", function() {
    var temperature = unit.temperatureToImperial("applepower");
    expect(temperature).toBeNaN();
  });
});

describe("handling being given an object", function() {
  it("should return NaN when given an object", function() {
    var speed = unit.speedToImperial({speed: 30});
    expect(speed).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var speed = unit.speedToMetric({speed: 30});
    expect(speed).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var distance = unit.distanceToMetric({distance: 45});
    expect(distance).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var distance = unit.distanceToImperial({speed: 23});
    expect(distance).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var rounded = unit.roundTo(5, {speed : 'ten'});
    expect(rounded).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var rounded = unit.roundTo({speed : 'ten'}, 5);
    expect(rounded).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var temperature = unit.temperatureToMetric({temperature : 'ten'}, 5);
    expect(temperature).toBeNaN();
  });
  it("should return NaN when given an object", function() {
    var temperature = unit.temperatureToImperial({temperature : 'three'}, 5);
    expect(temperature).toBeNaN();
  });
});

describe("handling being given a multi-dimensional array", function() {
  it("should return NaN when given an multi-element array", function() {
    var speed = unit.speedToImperial([30, 20]);
    expect(speed).toBeNaN();
  });
  it("should return NaN when given an multi-element array", function() {
    var speed = unit.speedToMetric([30, 20]);
    expect(speed).toBeNaN();
  });
  it("should return NaN when given an multi-element array", function() {
    var distance = unit.distanceToMetric([30, 20]);
    expect(distance).toBeNaN();
  });
  it("should return NaN when given an multi-element array", function() {
    var distance = unit.distanceToImperial([30, 20]);
    expect(distance).toBeNaN();
  });
  it("should return NaN when given an multi-element array", function() {
    var temperature = unit.temperatureToMetric([10, 20]);
    expect(temperature).toBeNaN();
  });
  it("should return NaN when given an multi-element array", function() {
    var temperature = unit.temperatureToImperial([0, 15]);
    expect(temperature).toBeNaN();
  });
});

describe("converting cm to inches", function() {
  it("should return 1 inch when given 2.5cm", function() {
    var volume = unit.volumeToImperial(2.5);
    expect(volume).toBe(1);
  });
  it("should return 0.1 inch when given 0.25cm", function() {
    var volume = unit.volumeToImperial(0.25);
    expect(volume).toBe(0.1);
  });
  it("should return 3.1 inches when given 8cm", function() {
    var volume = unit.volumeToImperial(8);
    expect(volume).toBe(3.1);
  });
  it("should return 0 inch when given 0.1cm", function() {
    var volume = unit.volumeToImperial(0.1);
    expect(volume).toBe(0);
  });
});

describe("converting inches to cm", function() {
  it("should return 2.5cm when given 1 inch", function() {
    var volume = unit.volumeToMetric(1);
    expect(volume).toBe(2.5);
  });
  it("should return 0.5cm when given 0.2inch", function() {
    var volume = unit.volumeToMetric(0.2);
    expect(volume).toBe(0.5);
  });
  it("should return 10.2cm when given 4inches", function() {
    var volume = unit.volumeToMetric(4);
    expect(volume).toBe(10.2);
  });
  it("should return 0.3cm when given 0.1inch", function() {
    var volume = unit.volumeToMetric(0.1);
    expect(volume).toBe(0.3);
  });
});

describe("converting degrees celcius to fahrenheit", function(){
  it("should return 32 when given 0", function(){
    var temperature = unit.temperatureToImperial(0);
    expect(temperature).toBe(32);
  });
  it("should return 27 when given -3", function(){
    var temperature = unit.temperatureToImperial(-3);
    expect(temperature).toBe(27);
  });
  it("should return -4 when given -20", function(){
    var temperature = unit.temperatureToImperial(-20);
    expect(temperature).toBe(-4);
  });
  it("should return 0 when given -18", function(){
    var temperature = unit.temperatureToImperial(-18);
    expect(temperature).toBe(0);
  });
  it("should return 64 when given 18", function(){
    var temperature = unit.temperatureToImperial(18);
    expect(temperature).toBe(64);
  });
  it("should return 41 when given 5", function(){
    var temperature = unit.temperatureToImperial(5);
    expect(temperature).toBe(41);
  });
});

describe("converting degrees fahrenheit to celcius", function(){
  it("should return -18 when given 0", function(){
    var temperature = unit.temperatureToMetric(0);
    expect(temperature).toBe(-18);
  });
  it("should return -7 when given 20", function(){
    var temperature = unit.temperatureToMetric(20);
    expect(temperature).toBe(-7);
  });
  it("should return 1 when given 33", function(){
    var temperature = unit.temperatureToMetric(33);
    expect(temperature).toBe(1);
  });
  it("should return 4 when given 39", function(){
    var temperature = unit.temperatureToMetric(39);
    expect(temperature).toBe(4);
  });
  it("should return -11 when given 12", function(){
    var temperature = unit.temperatureToMetric(12);
    expect(temperature).toBe(-11);
  });
  it("should return -5 when given 23", function(){
    var temperature = unit.temperatureToMetric(23);
    expect(temperature).toBe(-5);
  });
});
