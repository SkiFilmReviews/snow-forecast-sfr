import UnitUtil from '../utils/UnitUtil';

describe('Given the UnitUtil', () => {
  describe('- when converting speed to metric UnitUtils - ', () => {
    it('should convert 16 mph to 26 kph', () => {
      const speed = UnitUtil.speedToMetric(16);
      expect(speed).toBe(26);
    });
    it('should convert 25 mph to 16kph', () => {
      const speed = UnitUtil.speedToMetric(25);
      expect(speed).toBe(40);
    });
    it('should convert 16.2521mph to 26 kph', () => {
      const speed = UnitUtil.speedToMetric(16.2521);
      expect(speed).toBe(26);
    });
    it('should convert 73mph to 110kph', () => {
      const speed = UnitUtil.speedToMetric(73);
      expect(speed).toBe(117);
    });
    it('should convert 62mph to 100kph', () => {
      const speed = UnitUtil.speedToMetric(62);
      expect(speed).toBe(100);
    });
  });

  describe('- when converting speed to imperial UnitUtils (rounded to nearest multiple of 5)-', () => {
    it('should convert 10 kph to 6 mph', () => {
      const speed = UnitUtil.speedToImperial(10);
      expect(speed).toBe(5);
    });
    it('should convert 25 kph to 15mph', () => {
      const speed = UnitUtil.speedToImperial(25);
      expect(speed).toBe(15);
    });
    it('should convert 23.2521 kph to 15 mph', () => {
      const speed = UnitUtil.speedToImperial(23.2521);
      expect(speed).toBe(15);
    });
    it('should convert 37.53920 kph to 25 mph', () => {
      const speed = UnitUtil.speedToImperial(37.5392);
      expect(speed).toBe(25);
    });
    it('should convert 50 kph to 30 mph', () => {
      const speed = UnitUtil.speedToImperial(50);
      expect(speed).toBe(30);
    });
    it('should convert 62 kph to 40 mph', () => {
      const speed = UnitUtil.speedToImperial(62);
      expect(speed).toBe(40);
    });
  });

  describe('- when converting ft to metres (round to nearest 50) -', () => {
    it('should return 50 when given 100', () => {
      const distance = UnitUtil.distanceToMetric(100);
      expect(distance).toBe(50);
    });
    it('should return 1500 when given 5000', () => {
      const distance = UnitUtil.distanceToMetric(5000);
      expect(distance).toBe(1500);
    });
    it('should return 1500 when given 4921.2598', () => {
      const distance = UnitUtil.distanceToMetric(4921.2598);
      expect(distance).toBe(1500);
    });
    it('should return 0 when given 50', () => {
      const distance = UnitUtil.distanceToMetric(50);
      expect(distance).toBe(0);
    });
  });

  describe('- when converting metres to ft (round to nearest 100) -', () => {
    it('should return 100 when given 30', () => {
      const distance = UnitUtil.distanceToImperial(30);
      expect(distance).toBe(100);
    });
    it('should return 4000 when given 1232.312', () => {
      const distance = UnitUtil.distanceToImperial(1232.312);
      expect(distance).toBe(4000);
    });
    it('should return 2300 when given 750', () => {
      const distance = UnitUtil.distanceToImperial(750);
      expect(distance).toBe(2500);
    });
    it('should return 4100 when given 1264', () => {
      const distance = UnitUtil.distanceToImperial(1264);
      expect(distance).toBe(4100);
    });
  });

  describe('- when converting cm to inches', () => {
    it('should return 1 inch when given 2.5cm', () => {
      const volume = UnitUtil.volumeToImperial(2.5);
      expect(volume).toBe(1);
    });

    it('should return 0.1 inch when given 0.25cm', () => {
      const volume = UnitUtil.volumeToImperial(0.25);
      expect(volume).toBe(0.1);
    });

    it('should return 3.1 inches when given 8cm', () => {
      const volume = UnitUtil.volumeToImperial(8);
      expect(volume).toBe(3.1);
    });

    it('should return 0 inch when given 0.1cm', () => {
      const volume = UnitUtil.volumeToImperial(0.1);
      expect(volume).toBe(0);
    });
  });

  describe('- when converting inches to cm', () => {
    it('should return 2.5cm when given 1 inch', () => {
      const volume = UnitUtil.volumeToMetric(1);
      expect(volume).toBe(2.5);
    });

    it('should return 0.5cm when given 0.2inch', () => {
      const volume = UnitUtil.volumeToMetric(0.2);
      expect(volume).toBe(0.5);
    });

    it('should return 10.2cm when given 4inches', () => {
      const volume = UnitUtil.volumeToMetric(4);
      expect(volume).toBe(10.2);
    });

    it('should return 0.3cm when given 0.1inch', () => {
      const volume = UnitUtil.volumeToMetric(0.1);
      expect(volume).toBe(0.3);
    });
  });

  describe('- when converting degrees celsius to fahrenheit', () => {
    it('should return 32 when given 0', () => {
      const temperature = UnitUtil.temperatureToImperial(0);
      expect(temperature).toBe(32);
    });

    it('should return 27 when given -3', () => {
      const temperature = UnitUtil.temperatureToImperial(-3);
      expect(temperature).toBe(27);
    });

    it('should return -4 when given -20', () => {
      const temperature = UnitUtil.temperatureToImperial(-20);
      expect(temperature).toBe(-4);
    });

    it('should return 0 when given -18', () => {
      const temperature = UnitUtil.temperatureToImperial(-18);
      expect(temperature).toBe(0);
    });

    it('should return 64 when given 18', () => {
      const temperature = UnitUtil.temperatureToImperial(18);
      expect(temperature).toBe(64);
    });

    it('should return 41 when given 5', () => {
      const temperature = UnitUtil.temperatureToImperial(5);
      expect(temperature).toBe(41);
    });
  });

  describe('- when converting degrees fahrenheit to celsius', () => {
    it('should return -18 when given 0', () => {
      const temperature = UnitUtil.temperatureToMetric(0);
      expect(temperature).toBe(-18);
    });

    it('should return -7 when given 20', () => {
      const temperature = UnitUtil.temperatureToMetric(20);
      expect(temperature).toBe(-7);
    });

    it('should return 1 when given 33', () => {
      const temperature = UnitUtil.temperatureToMetric(33);
      expect(temperature).toBe(1);
    });

    it('should return 4 when given 39', () => {
      const temperature = UnitUtil.temperatureToMetric(39);
      expect(temperature).toBe(4);
    });

    it('should return -11 when given 12', () => {
      const temperature = UnitUtil.temperatureToMetric(12);
      expect(temperature).toBe(-11);
    });

    it('should return -5 when given 23', () => {
      const temperature = UnitUtil.temperatureToMetric(23);
      expect(temperature).toBe(-5);
    });
  });
});
