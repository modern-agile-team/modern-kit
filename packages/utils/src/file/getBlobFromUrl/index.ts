export const getBlobFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch resource. status: ${response.status}`);
    }

    return await response.blob();
  } catch (err: any) {
    console.error(
      `Failed to get the Blob from the URL. message: ${err.message}`
    );
    throw err;
  }
};
