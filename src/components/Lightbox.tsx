import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, MapPin, Activity, Heart, Share2 } from 'lucide-react'; // Added Share2 icon
import { Photo } from '../types';
import { usePhotoStore } from '../store/usePhotoStore';

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
  const { likedPhotos, toggleLike } = usePhotoStore();
  const isLiked = likedPhotos.has(photo.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  // Function to handle direct download
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch the image.');
      }
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  // Function to copy the URL to clipboard
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(photo.url);
      console.log('Image URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative max-h-[90vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-8"
          >
            <h2 className="text-6xl mb-2 font-bold text-white">{photo.title}</h2>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {photo.location && (
                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin size={16} />
                    <span>{photo.location}</span>
                  </p>
                )}
                <p className="flex items-center gap-2 text-gray-300">
                  <Activity size={16} />
                  <span>{photo.photographer}</span>
                </p>
              </div>
              
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/20
                    ${isLiked ? "text-red-500" : "text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                </motion.button>

                {/* Updated Download Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(photo.url, photo.title || 'photo');
                  }}
                >
                  <Download size={20} />
                </motion.button>

                {/* New Share Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(); // Call the share handler
                  }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-md 
              transition-colors hover:bg-white/20"
          >
            <X size={24} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white 
              backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ChevronLeft size={32} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white 
              backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ChevronRight size={32} />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
