/**
 * Wrapper class for internal snow-request
 */
import SnowRequest from './SnowRequest';
import { IParseOptions, ISnowRequest, TElevation, TResortName } from './types';

const request: ISnowRequest = SnowRequest();

export default {
  parseResort(name: TResortName, elevation: TElevation, cb: any, opts?: IParseOptions) {
    request.parseResort(name, elevation, cb, opts);
  },
};
