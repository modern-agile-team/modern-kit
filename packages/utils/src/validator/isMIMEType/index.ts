import { MIMEType, MIME_TYPES } from '../../file/constants';

export const isMIMEType = (type: string): type is MIMEType => {
  return MIME_TYPES.some((value) => value === type);
};
