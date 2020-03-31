import { TDay, ITimeUtil } from '../types';

/**
 * Utility module that helps us determine what the starting days/times for the
 * forecast are so the returned JSON object is correct. Works regardless of device's
 * timezone.
 */

const TimeUtil: ITimeUtil = {
  times: ['AM', 'PM', 'night'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  currentDayOffset: 0,
  MIN_DAY_STRING_LEN: 4, // Sometimes the site cuts off the day name, need to check
  MAX_INDEX_CNT: 17, // Maximum columns with information in them

  // PUBLIC: Used to get the time that the information is relevant for.
  getTime(timePeriodIndex, startDay, index) {
    const timeDiff = (timePeriodIndex + index) % this.times.length;
    const dayDiff = this.getDayOffset(startDay, timePeriodIndex, index);

    // We've finished building an object, reset offset value.
    if (index === this.MAX_INDEX_CNT) {
      this.currentDayOffset = 0;
    }
    return this.days[dayDiff] + ' ' + this.times[timeDiff];
  },

  // PUBLIC: Helper method to return index of first time the forecast has
  getTimeOffset(startTime) {
    return this.times.indexOf(startTime);
  },

  // PUBLIC: Helper method to return the correct index for the day of a specified column.
  getDayOffset(startDay, timePeriodIndex, index) {
    const firstDayPos = this.days.indexOf(this.getCorrectDay(startDay));

    // Black magic
    if (((timePeriodIndex + index) / this.times.length) % 1 === 0 && timePeriodIndex + index !== 0) {
      this.currentDayOffset++;
    }
    return (firstDayPos + this.currentDayOffset) % this.days.length;
  },

  // PUBLIC: Helper method that returns the day (in UTC string) of the current forecast cell.
  getDay(lastUpdateDate, timePeriodIndex, index) {
    const offset = Math.floor((timePeriodIndex + index) / this.times.length);
    const date = new Date(lastUpdateDate.trim());

    if (offset > 0) {
      date.setDate(date.getDate() + offset);
    }
    return date.toDateString();
  },

  /*
   * PUBLIC: Helper method to determine whether the day we've been given is correctly
   * formatted. This is because snow forecast sometimes cuts off the day (ie Mon instead of Monday)
   */
  getCorrectDay(day) {
    // If length of day is sufficient, just trim
    if (day.length > this.MIN_DAY_STRING_LEN) {
      return day.split(' ')[0].trim() as TDay;
    }
    return this.days.find((currentDay) => currentDay.includes(day))!;
  },

  /*
   * PUBLIC
   * Cheerio returns us an oddly formatted string which the site uses to show
   * when the forecast was issued. In order to make it easier for developers to
   * manipulate, let's make sure we always deliver a consistent issued date.
   * issuedDate: the date we get from cheerio
   *
   * returns: a string ie: 2pm 07 Jul 2015
   */
  fixIssueDateFormat(issuedDate: string) {
    const tmpDateArray = issuedDate.split(' ');
    const tmpDate = tmpDateArray.join('').match(/(\d+|[^\d]+)/g);

    // TODO can we clean up?
    // @ts-ignore
    return tmpDate[0] + tmpDate[1].trim() + ' ' + tmpDate[2] + ' ' + tmpDate[3].trim() + ' ' + tmpDate[4];
  },

  /*
   * PUBLIC
   * Helper function to get the previous day of the week given a day input would always
   * be complete word since it would have enough space to display it in the second column.
   * This function does not support abbreviation input
   */
  getPrevDay(startDay) {
    const index = this.days.indexOf(startDay);
    return index === 0 ? this.days[6] : this.days[index - 1];
  },
};

export default TimeUtil;
