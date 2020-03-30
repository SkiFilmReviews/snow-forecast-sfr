/**
 * Wrapper class for internal snow-request
 */
import SnowRequest from './snow-request';
import { IParseOptions, ISnowRequest, TElevation, TResortName } from './types';

const request: ISnowRequest = SnowRequest();

export default {
  parseResort: function(name: TResortName, elevation: TElevation, cb: any, opts?: IParseOptions){
    request.parseResort(name, elevation, cb, opts);
  }
};
