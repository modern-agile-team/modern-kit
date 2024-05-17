import { TYPE_TO_FORMAT_MAPPER } from '../constants';

const createBlobFromCanvas = (canvas: HTMLCanvasElement, format: string) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error(`Failed to create blob with format ${format}`));
      }
    }, format);
  });
};

export const convertImageToBlob = (
  url: string,
  imageType: keyof typeof TYPE_TO_FORMAT_MAPPER = 'png',
) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get 2d context');

        ctx.drawImage(img, 0, 0);

        const result = await createBlobFromCanvas(
          canvas,
          TYPE_TO_FORMAT_MAPPER[imageType],
        );
        resolve(result);
      } catch (error: any) {
        console.error(`Failed to load image. message: ${error.mesaage}`);
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};
