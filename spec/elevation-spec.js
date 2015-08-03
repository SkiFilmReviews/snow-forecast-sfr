#!javascript
var elevation = require("../elevation");

describe("ensure validation only works for low,mid,top", function () {
  it("should return true when given bot'", function(){
    expect(elevation.validate('bot')).toBeTruthy();
  });
  it("should return true when given 'mid'", function(){
    expect(elevation.validate('mid')).toBeTruthy();
  });
  it("should return true when given 'top'", function(){
    expect(elevation.validate('top')).toBeTruthy();
  });
  it("should return false when given 'banana'", function(){
    expect(elevation.validate('banana')).toBeFalsy();
  });
});
