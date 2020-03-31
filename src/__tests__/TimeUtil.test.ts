import TimeUtil from '../utils/TimeUtil';

describe('Given the TimeUtil', () => {
  describe('- when getting the TimeUtil offset -', () => {
    it("should return 0 when given 'AM'", () => {
      expect(TimeUtil.getTimeOffset('AM')).toBe(0);
    });

    it("should return 1 when given 'PM'", () => {
      expect(TimeUtil.getTimeOffset('PM')).toBe(1);
    });

    it("should return 2 when given 'night'", () => {
      expect(TimeUtil.getTimeOffset('night')).toBe(2);
    });
  });

  describe('- when getting the correct day -', () => {
    it("should return Sunday when given 'Sun'", () => {
      const day = 'Sun';
      expect(TimeUtil.getCorrectDay(day)).toBe('Sunday');
    });
    it("should return Sunday when given 'Sunday '", () => {
      const day = 'Sunday ';
      expect(TimeUtil.getCorrectDay(day)).toBe('Sunday');
    });
    it("should return Saturday when given 'Sat'", () => {
      const day = 'Sat';
      expect(TimeUtil.getCorrectDay(day)).toBe('Saturday');
    });
    it("should return Tuesday when given 'Tue'", () => {
      const day = 'Tue';
      expect(TimeUtil.getCorrectDay(day)).toBe('Tuesday');
    });
    it("should return undefined when given 'Mons'", () => {
      const day = 'Mons';
      expect(TimeUtil.getCorrectDay(day)).toBe(undefined);
    });
  });

  describe('- when getting the TimeUtil -', () => {
    beforeEach(() => {
      TimeUtil.currentDayOffset = 0;
    });

    it('should return Sunday AM', () => {
      expect(TimeUtil.getTime(0, 'Sun', 0)).toBe('Sunday AM');
    });

    it('should return Sunday night', () => {
      expect(TimeUtil.getTime(0, 'Sun', 3)).toBe('Monday AM');
    });

    it('should return Monday PM', () => {
      TimeUtil.currentDayOffset += 1;
      expect(TimeUtil.getTime(0, 'Sun', 4)).toBe('Monday PM');
    });

    it('should return Friday AM', () => {
      TimeUtil.currentDayOffset += 2;
      expect(TimeUtil.getTime(3, 'Tue', 9)).toBe('Friday AM');
    });
  });

  describe('- when given the getDayOffset -', () => {
    beforeEach(() => {
      TimeUtil.currentDayOffset = 0;
    });

    it('should return 0', () => {
      expect(TimeUtil.getDayOffset('Sun', 0, 0)).toBe(0);
    });

    it('should return 0', () => {
      expect(TimeUtil.getDayOffset('Sun', 2, 0)).toBe(0);
    });

    it('should return 0', () => {
      expect(TimeUtil.getDayOffset('Sun', 0, 7)).toBe(0);
    });

    it('should return 2', () => {
      TimeUtil.currentDayOffset += 2;
      expect(TimeUtil.getDayOffset('Sun', 0, 7)).toBe(2);
    });

    it('should return 2', () => {
      TimeUtil.currentDayOffset += 2;
      expect(TimeUtil.getDayOffset('Sun', 0, 7)).toBe(2);
    });

    it('should return 2', () => {
      TimeUtil.currentDayOffset += 1;
      expect(TimeUtil.getDayOffset('Monday', 0, 4)).toBe(2);
    });

    it('should return 5', () => {
      TimeUtil.currentDayOffset += 4;
      expect(TimeUtil.getDayOffset('Sunday', 0, 12)).toBe(5);
    });

    it('should return 5', () => {
      TimeUtil.currentDayOffset += 3;
      expect(TimeUtil.getDayOffset('Monday', 0, 9)).toBe(5);
    });

    it('should return 6', () => {
      TimeUtil.currentDayOffset += 5;
      expect(TimeUtil.getDayOffset('Sunday', 2, 16)).toBe(6);
    });

    it('should return 6', () => {
      TimeUtil.currentDayOffset += 1;
      expect(TimeUtil.getDayOffset('Friday', 1, 7)).toBe(6);
    });
  });

  describe('- when given the fixIssueDateFormat -', () => {
    it("should return '2pm 07 Jul 2015'", () => {
      expect(TimeUtil.fixIssueDateFormat('2 pm07 Jul 2015')).toBe('2pm 07 Jul 2015');
    });

    it("should return '11am 07 Jul 2015'", () => {
      expect(TimeUtil.fixIssueDateFormat('11 a m07 Jul 2015')).toBe('11am 07 Jul 2015');
    });

    it("should return '9pm 07 Jul 2015'", () => {
      expect(TimeUtil.fixIssueDateFormat('9pm07Jul2015')).toBe('9pm 07 Jul 2015');
    });

    it("should return '12pm 25 Aug 2015'", () => {
      expect(TimeUtil.fixIssueDateFormat('12 p m 25 A ug 2015')).toBe('12pm 25 Aug 2015');
    });
  });
});
