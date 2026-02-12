const CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
} as const;
export type CanvasImageType = keyof typeof CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER;

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
          throw new Error('2D 컨텍스트 획득(getContext("2d"))에 실패했습니다.', {
            cause: new Error('"getContext(\'2d\')"가 null을 반환함'),
          });
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
    img.onerror = (error) =>
      reject(
        new Error('이미지를 base64로 변환하는 데 실패했습니다.', {
          cause: error,
        })
      );
  });
}
