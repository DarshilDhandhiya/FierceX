import { useEffect, useState } from 'react';

export const useImageAspectRatio = (imageUrl: string): number | null => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [imageUrl]);

  return aspectRatio;
};

export const getImageRowSpan = (aspectRatio: number | null): number => {
  if (!aspectRatio) return 2; // Default span
  
  // Landscape images (wider than tall)
  if (aspectRatio > 1.2) return 2;
  // Portrait images (taller than wide)
  if (aspectRatio < 0.8) return 3;
  // Nearly square images
  return 2;
};