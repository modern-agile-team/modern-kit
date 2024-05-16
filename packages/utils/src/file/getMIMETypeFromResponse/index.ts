export const getMIMETypeFromResponse = (response: Response) => {
  try {
    return response.headers.get('Content-Type') ?? '';
  } catch (err: any) {
    console.error(
      `Failed to get the MIME type from Response. message: ${err.message}`
    );
    return '';
  }
};
