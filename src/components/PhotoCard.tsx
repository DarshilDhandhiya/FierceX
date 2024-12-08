import React from "react";
import { motion } from "framer-motion";
import { Heart, Download, MapPin, Activity } from "lucide-react";
import { Photo } from "../types";
import { usePhotoStore } from "../store/usePhotoStore";
import { useImageAspectRatio, getImageRowSpan } from "../utils/imageUtils";

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const { likedPhotos, toggleLike } = usePhotoStore();
  const isLiked = likedPhotos.has(photo.id);
  const aspectRatio = useImageAspectRatio(photo.url);
  const rowSpan = getImageRowSpan(aspectRatio);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1"
      style={{
        gridRow: `span ${rowSpan}`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : "auto",
      }}
    >
      <div className="group relative h-full cursor-pointer" onClick={onClick}>
        <img
          src={photo.url}
          alt={photo.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-"
          loading="lazy"
          style={{
            aspectRatio: aspectRatio ? `${aspectRatio}` : "auto",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-40" />

        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-lg font-semibold line-clamp-1">{photo.title}</h3>
          {photo.location && (
            <p className="flex items-center gap-2 text-xs">
              <MapPin size={12} />
              <span className="line-clamp-1">{photo.location}</span>
            </p>
          )}
          <p className="flex items-center gap-2 text-xs">
            <Activity size={12} />
            <span className="line-clamp-1">{photo.photographer}</span>
          </p>
        </div>
      </div>

      <div className="absolute right-2 top-2 flex gap-2">
      <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={(e) => {
    e.stopPropagation();
    toggleLike(photo.id);
  }}
  className={`rounded-full bg-black/50 p-1.5 shadow-md transition-colors hover:bg-black/70 ${
    isLiked ? 'text-red-500' : 'text-white'
  }`}
>
  <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
</motion.button>
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={async (e) => {
    e.stopPropagation();
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
  }}
  className="rounded-full bg-black/50 p-1.5 text-white shadow-md transition-colors hover:bg-black/70"
>
  <Download size={16} />
</motion.button>

</div>

    </motion.div>
  );
};

export default PhotoCard;
