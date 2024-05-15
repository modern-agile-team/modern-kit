type ImageType = 'png' | 'jpeg' | 'jpg' | 'webp';

const getAvailableToDataUrlImageType = (imageType: string) => {
  if (imageType === 'jpg') return 'jpeg';
  return imageType;
};

export const convertImageToBase64 = async (
  url: string,
  imageType: ImageType = 'png'
) => {
  const img = new Image();
  img.src = url;

  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');

      ctx?.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(
        `image/${getAvailableToDataUrlImageType(imageType)}`
      );

      resolve(dataUrl);
    };
    img.onerror = () => reject('Failed to convert the image to base64.');
  });
};
