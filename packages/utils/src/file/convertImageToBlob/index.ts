const CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
} as const;
type CanvasImageType = keyof typeof CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER;

const createBlobFromCanvas = (canvas: HTMLCanvasElement, format: string) => {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error(`Failed to create blob with format ${format}`));
      }
    }, format);
  });
};

export function convertImageToBlob(
  url: string,
  imageType: CanvasImageType = 'png'
) {
  return new Promise<Blob>((resolve, reject) => {
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
          CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER[imageType]
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
}
