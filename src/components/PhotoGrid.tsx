import React from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { Photo } from '../types';
import PhotoCard from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onPhotoClick }) => {
  const breakpointColumns = {
    default: 4,
    1920: 4,
    1536: 3,
    1024: 2,
    640: 1,
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-2 sm:px-6 lg:px-8"
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex w-auto"
        columnClassName="pl-4 bg-clip-padding first:pl-0"
      >
        {photos.map((photo, index) => (
          <div key={`${photo.id}-${index}`} className="mb-4">
            <PhotoCard
              photo={photo}
              onClick={() => onPhotoClick(photo)}
            />
          </div>
        ))}
      </Masonry>
    </motion.div>
  );
};

export default PhotoGrid;