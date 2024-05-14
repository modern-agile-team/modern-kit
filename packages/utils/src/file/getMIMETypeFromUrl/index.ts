import { getMIMETypeFromResponse } from '../getMIMETypeFromResponse';

export const getMIMETypeFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    return await getMIMETypeFromResponse(response);
  } catch (err: any) {
    console.error(
      `Failed to get the MIME type from the URL. message: ${err.message}`
    );
  }
};
