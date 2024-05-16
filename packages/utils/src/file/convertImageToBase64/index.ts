type ImageType = 'image/png' | 'image/jpeg' | 'image/jpg' | 'image/webp';

const getAvailableToDataUrlImageType = (imageType: ImageType) => {
  if (imageType === 'image/jpg') return 'image/jpeg';
  return imageType;
};

export const convertImageToBase64 = async (
  url: string,
  imageType: ImageType = 'image/png'
) => {
  const img = new Image();
  img.src = url;

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      try {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Failed to get 2d context');
        }

        ctx?.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(
          getAvailableToDataUrlImageType(imageType)
        );
        resolve(dataUrl);
      } catch (error: any) {
        reject(
          `Failed to convert the image to base64. message: ${error.message}`
        );
      }
    };
    img.onerror = () => reject('Failed to convert the image to base64.');
  });
};
