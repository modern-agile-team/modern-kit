import { isString } from '../isString';
import { MIMEType, MIME_TYPES } from '../../file/constants';

export const isMIMEType = (arg: unknown): arg is MIMEType => {
  return isString(arg) ? MIME_TYPES.some((value) => value === arg) : false;
};
