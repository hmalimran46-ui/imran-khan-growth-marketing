/**
 * Resizes an image file to stay well within Firestore document limits (< 300KB)
 * and maximum width/height while maintaining crisp visual fidelity and aspect ratio.
 */
export async function compressImage(
  dataUrl: string,
  maxSizeInMB: number = 0.35,
  maxWidth: number = 1200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Restrict max width/height while maintaining aspect ratio
      const maxDim = maxWidth;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Start with balanced quality and iteratively reduce if needed
      let quality = 0.82;
      let result = canvas.toDataURL('image/jpeg', quality);

      const targetByteLength = maxSizeInMB * 1024 * 1024;
      while (result.length > targetByteLength && quality > 0.3) {
        quality -= 0.1;
        result = canvas.toDataURL('image/jpeg', quality);
      }

      resolve(result);
    };
    img.onerror = () => reject(new Error('Failed to load image for compression'));
  });
}
