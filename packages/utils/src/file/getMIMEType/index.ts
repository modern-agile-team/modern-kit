import { getMIMETypeFromFile } from '../getMIMETypeFromFile';
import { getMIMETypeFromResponse } from '../getMIMETypeFromResponse';
import { getMIMETypeFromUrl } from '../getMIMETypeFromUrl';

export const getMIMEType = async (data: string | File | Response) => {
  try {
    if (data instanceof File) {
      return getMIMETypeFromFile(data);
    }

    if (data instanceof Response) {
      return await getMIMETypeFromResponse(data);
    }

    return await getMIMETypeFromUrl(data);
  } catch (err: any) {
    console.error(`Failed to get the MIME type. message: ${err.message}`);
  }
};
