#!javascript
var time = require("../time-util");

describe("Should return correct time when given index", function(){
  it("should return 0 when given 'AM'", function(){
    expect(time.getTimeOffset('AM')).toBe(0);
  });
  it("should return 1 when given 'PM'", function(){
    expect(time.getTimeOffset('PM')).toBe(1);
  });
  it("should return 2 when given 'night'", function(){
    expect(time.getTimeOffset('night')).toBe(2);
  });
  it("should return -1 when given 3", function(){
    expect(time.getTimeOffset(3)).toBe(-1);
  });
});

describe("Should return correctly formatted day", function(){
  it("should return Sunday when given 'Sun'", function(){
    var day = 'Sun';
    expect(time.getCorrectDay(day)).toBe('Sunday');
  });
  it("should return Sunday when given 'Sunday '", function(){
    var day = 'Sunday ';
    expect(time.getCorrectDay(day)).toBe('Sunday');
  });
  it("should return Saturday when given 'Sat'", function(){
    var day = 'Sat';
    expect(time.getCorrectDay(day)).toBe('Saturday');
  });
  it("should return Tuesday when given 'Tue'", function(){
    var day = 'Tue';
    expect(time.getCorrectDay(day)).toBe('Tuesday');
  });
  it("should return undefined when given 'Mons'", function(){
    var day = 'Mons';
    expect(time.getCorrectDay(day)).toBe(undefined);
  });
});

describe("Should give us the time of the forecast", function(){
  beforeEach(function(){
      time.currentDayOffset = 0;
  });

  it("should return Sunday AM", function(){
    expect(time.getTime(0,'Sun',0)).toBe('Sunday AM');
  });
  it("should return Sunday night", function(){
    expect(time.getTime(0,'Sun',3)).toBe('Monday AM');
  });
  it("should return Monday PM", function(){
    time.currentDayOffset += 1;
    expect(time.getTime(0,'Sun',4)).toBe('Monday PM');
  });
  it("should return Friday AM", function(){
    time.currentDayOffset +=2;
    expect(time.getTime(3,'Tue',9)).toBe('Friday AM');
  });
});

describe("Should return the correct day index", function(){
  beforeEach(function(){
      time.currentDayOffset = 0;
  });
  it("should return 0", function(){
    expect(time.getDayOffset('Sun',0,0)).toBe(0);
  });
  it("should return 0", function(){
    expect(time.getDayOffset('Sun',2,0)).toBe(0);
  });
  it("should return 0", function(){
    expect(time.getDayOffset('Sun',0,7)).toBe(0);
  });
  it("should return 2", function(){
    time.currentDayOffset += 2;
    expect(time.getDayOffset('Sun',0,7)).toBe(2);
  });
  it("should return 2", function(){
    time.currentDayOffset += 2;
    expect(time.getDayOffset('Sun',0,7)).toBe(2);
  });
  it("should return 2", function(){
    time.currentDayOffset += 1;
    expect(time.getDayOffset('Monday',0,4)).toBe(2);
  });
  it("should return 5", function(){
    time.currentDayOffset += 4;
    expect(time.getDayOffset('Sunday',0,12)).toBe(5);
  });
  it("should return 5", function(){
    time.currentDayOffset += 3;
    expect(time.getDayOffset('Monday',0,9)).toBe(5);
  });
  it("should return 6", function(){
    time.currentDayOffset += 5;
    expect(time.getDayOffset('Sunday',2,16)).toBe(6);
  });
  it("should return 6", function(){
    time.currentDayOffset += 1;
    expect(time.getDayOffset('Friday',1,7)).toBe(6);
  });
});

describe("Should return a correctly formatted date string", function(){
  it("should return '2pm 07 Jul 2015'", function(){
    expect(time.fixIssueDateFormat('2 pm07 Jul 2015')).toBe('2pm 07 Jul 2015');
  });
  it("should return '11am 07 Jul 2015'", function(){
    expect(time.fixIssueDateFormat('11 a m07 Jul 2015')).toBe('11am 07 Jul 2015');
  });
  it("should return '9pm 07 Jul 2015'", function(){
    expect(time.fixIssueDateFormat('9pm07Jul2015')).toBe('9pm 07 Jul 2015');
  });
  it("should return '12pm 25 Aug 2015'", function(){
    expect(time.fixIssueDateFormat('12 p m 25 A ug 2015')).toBe('12pm 25 Aug 2015');
  });
});
