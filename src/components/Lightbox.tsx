import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  photo,
  onClose,
  onPrevious,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.url);
      if (!response.ok) throw new Error('Failed to fetch the photo');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = photo.title || 'photo';
      link.click();

      // Clean up the object URL
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 50 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-6xl mb-2 font-bold text-white">{photo.title}</h2>
            <p className="text-gray-200">{photo.photographer}</p>
            {photo.camera && (
              <p className="mt-2 text-sm text-gray-300">
                {photo.camera.model} • f/{photo.camera.settings.aperture} •{' '}
                {photo.camera.settings.shutterSpeed} • ISO{photo.camera.settings.iso}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          >
            <X size={24} />
          </button>

          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition-colors hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition-colors hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>

          <button
            onClick={handleDownload}
            className="absolute right-16 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          >
            <Download size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
