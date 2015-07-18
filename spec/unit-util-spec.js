#!javascript
var unit = require("../unit-util");

describe("convert speed to metric units", function () {
  it("should convert mph to kph", function () {
    var speed = unit.speedToMetric(16);
    expect(speed).toBe(10);
  });
});
