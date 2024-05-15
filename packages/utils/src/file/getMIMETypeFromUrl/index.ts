import { getBlobFromUrl } from '../getBlobFromUrl';

export const getMIMETypeFromUrl = async (url: string) => {
  try {
    const blob = await getBlobFromUrl(url);
    return blob?.type ?? '';
  } catch (err: any) {
    console.error(
      `Failed to get the MIME type from the URL. message: ${err.message}`
    );
    return '';
  }
};
