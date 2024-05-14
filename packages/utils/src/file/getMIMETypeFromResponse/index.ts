export const getMIMETypeFromResponse = async (response: Response) => {
  try {
    const blob = await response.blob();
    return blob.type;
  } catch (err: any) {
    console.error(
      `Failed to get the MIME type from Response. message: ${err.message}`
    );
  }
};
