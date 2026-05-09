/**
 * Resizes an image file to stay within a specific byte size limit (approx)
 * and maximum width/height while maintaining aspect ratio.
 */
export async function compressImage(
  dataUrl: string,
  maxSizeInMB: number = 4,
  maxWidth: number = 2400
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Start with high quality and reduce if needed
      let quality = 0.92;
      let result = canvas.toDataURL('image/jpeg', quality);

      // Keep reducing quality until under maxSize or quality is too low
      while (result.length > maxSizeInMB * 1024 * 1024 * 1.33 && quality > 0.3) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(result);
    };
    img.onerror = () => reject(new Error('Failed to load image for compression'));
  });
}
