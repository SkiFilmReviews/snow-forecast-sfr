export type TElevation = 'bot' | 'mid' | 'top';
export type TDays = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
export type TUnits = 'metric' | 'imperial';
export type TWindDirection = '';

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
  startDay: TDays;
  isMetric: boolean;
}

export interface IForecastCell {
  date: string;
  time: string;
  summary: string; //TODO
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
  name: TResortName;
  url: TUrl;
  issuedDate: TIssuedDate;
  elevation: TElevation;
  units: TUnits;
  forecast: [IForecastCell?];
}

export type TIssuedDate = string;
export type TUrl = string;
export type TResortName = string;

export type TSnowRequestError = string;
export type TSnowRequestMessage = string;
