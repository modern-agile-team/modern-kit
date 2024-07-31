import {
  CanvasImageType,
  CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER,
} from '../constants';

export async function convertImageToBase64(
  url: string,
  imageType: CanvasImageType = 'png'
) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      try {
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Failed to get 2d context');
        }

        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL(
          CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER[imageType]
        );
        resolve(dataUrl);
      } catch (err: any) {
        console.error(
          `Failed to convert the image to base64. message: ${err.message}`
        );
        reject(err);
      }
    };
    img.onerror = () =>
      reject(new Error('Failed to convert the image to base64'));
  });
}
