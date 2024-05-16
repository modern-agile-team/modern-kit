export const getMIMETypeFromResponse = (response: Response) => {
  return response.headers?.get('Content-Type') ?? '';
};
