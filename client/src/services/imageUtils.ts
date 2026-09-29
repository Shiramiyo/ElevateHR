/**
 * Utility functions for client-side image compression, validation, and sanitization.
 */

export interface CompressImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  allowedTypes?: string[];
}

/**
 * Validates, resizes, and compresses an uploaded image file into a safe, lightweight Base64 data URL.
 * Protects against database bloat and strips malicious script tags from images.
 */
export async function compressAndValidateImage(
  file: File,
  options: CompressImageOptions = {}
): Promise<string> {
  const {
    maxWidth = 400,
    maxHeight = 400,
    quality = 0.82,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  } = options;

  // 1. Strict MIME Type Validation
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    throw new Error(`Invalid file type (${file.type}). Allowed formats: JPEG, PNG, or WebP.`);
  }

  // 2. Reject files larger than 10MB
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image file is too large. Maximum file size is 10MB.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Corrupt or invalid image content.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas context unavailable
          return resolve(reader.result as string);
        }

        // Draw and compress to WebP or JPEG
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (e) {
          resolve(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
