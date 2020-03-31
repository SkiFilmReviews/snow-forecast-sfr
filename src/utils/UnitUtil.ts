import { IUnitUtil } from '../types';

/**
 * Copied code from stack overflow to round numbers to nearest multiple.
 * Credit to Makrem Saleh from:
 *   https://stackoverflow.com/questions/3254047/round-number-up-to-the-nearest-multiple-of-3
 */

const pRoundTo = function (multiple: number, value: number): number {
  const rem = Math.round(value % multiple);
  if (rem <= multiple / 2) {
    return Math.round(value - rem);
  } else {
    return Math.round(value + multiple - rem);
  }
};

/**
 * Utility module that helps us convert from/to metric/imperial
 */
const UnitUtil: IUnitUtil = {
  // Setup conversion variables as constants
  TO_MPH: 1.609344,
  TO_KPH: 0.62137,
  TO_CM: 0.3937,
  TO_IN: 2.54,
  TO_FT: 3.2808399,
  TO_M: 0.3048,

  // PUBLIC: Converts mph to kph (rounded up)
  speedToMetric(speed) {
    const kph = speed / this.TO_KPH;
    return Math.round(kph);
  },

  // PUBLIC: Converts kph to mph (rounded up)
  speedToImperial(speed) {
    const mph = speed / this.TO_MPH;
    return pRoundTo(5, Math.round(mph));
  },

  // PUBLIC: Converts feet to metres (rounded up to nearest 50m)
  distanceToMetric(distance) {
    return pRoundTo(50, Math.round(distance * this.TO_M));
  },

  // PUBLIC: Converts meters to feet (rounded up to nearest 100ft)
  distanceToImperial(distance) {
    return pRoundTo(100, Math.round(distance * this.TO_FT));
  },

  // PUBLIC: Converts inches to cm volume (rounded up)
  volumeToMetric(volume) {
    return Math.round((volume / this.TO_CM) * 10) / 10;
  },

  // PUBLIC: Converts cm to inches volume (rounded up)
  volumeToImperial(volume) {
    return Math.round((volume / this.TO_IN) * 10) / 10;
  },

  // PUBLIC: Converts degrees fahrenheit to celsius (rounded up)
  temperatureToMetric(temp) {
    const temperature = ((temp - 32) * 5) / 9;
    return pRoundTo(1, Math.round(temperature));
  },

  // PUBLIC: Converts degrees celsius to fahrenheit (rounded up)
  temperatureToImperial(temp) {
    const temperature = (temp * 9) / 5 + 32;
    return pRoundTo(1, Math.round(temperature));
  },
};

export default UnitUtil;
