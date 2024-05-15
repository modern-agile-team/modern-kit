export const getBlobFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.blob();
  } catch (err: any) {
    console.error(
      `Failed to get the Blob from the URL. message: ${err.message}`
    );
  }
};
