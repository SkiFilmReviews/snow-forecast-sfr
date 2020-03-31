export type TElevation = 'bot' | 'mid' | 'top';
export type TDay = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type TTimePeriods = 'AM' | 'PM' | 'night';
export type TUnits = 'metric' | 'imperial';
export type TWindDirection = '';
export type TIssuedDate = string;
export type TUrl = string;
export type TResortName = string;

export type TSnowRequestError = string;
export type TSnowRequestMessage = string;

export interface ISnowRequest {
  parseResort: (
    resort: TResortName,
    elevation: TElevation,
    cb: any,
    opts?: IParseOptions,
  ) => IRequestError | IForecast | undefined;
}

export interface IParseOptions {
  inMetric?: boolean;
}

export interface IRequestError {
  url: TUrl;
  error: TSnowRequestError;
  message: TSnowRequestMessage;
}

export interface IForecastRequest {
  resort: TResortName;
  url: TUrl;
  elevation: TElevation;
  issuedDate: TIssuedDate;
  lastUpdateDate: string;
  startDay: TDay;
  isMetric: boolean;
}

export interface IForecastCell {
  date: string;
  time: string;
  summary: string; // TODO
  wind: number;
  windDirection: string; // TODO
  snow: number;
  rain: number;
  freezingLevel: number;
  minTemp: number;
  maxTemp: number;
  windChill: number;
}

export interface IForecast {
  error?: IRequestError;
  name: TResortName;
  url: TUrl;
  issuedDate: TIssuedDate;
  elevation: TElevation;
  units: TUnits;
  forecast: IForecastCell[];
}

export interface ITimeUtil {
  times: TTimePeriods[];
  days: TDay[];
  currentDayOffset: number;
  MIN_DAY_STRING_LEN: number;
  MAX_INDEX_CNT: number;
  getTime: (timePeriodIndex: number, startDay: string, index: number) => string;
  getTimeOffset: (startTime: TTimePeriods) => number;
  getDayOffset: (startDay: string, timePeriodIndex: number, index: number) => number;
  getDay: (lastUpdateDate: string, timePeriodIndex: number, index: number) => string;
  getCorrectDay: (day: string) => TDay;
  fixIssueDateFormat: (issuedDate: string) => string;
  getPrevDay: (startDay: TDay) => TDay;
}

export interface IUnitUtil {
  TO_MPH: number;
  TO_KPH: number;
  TO_CM: number;
  TO_IN: number;
  TO_FT: number;
  TO_M: number;
  speedToMetric: (speed: number) => number;
  speedToImperial: (speed: number) => number;
  distanceToMetric: (distance: number) => number;
  distanceToImperial: (distance: number) => number;
  volumeToMetric: (volume: number) => number;
  volumeToImperial: (volume: number) => number;
  temperatureToMetric: (temperature: number) => number;
  temperatureToImperial: (temperature: number) => number;
}
