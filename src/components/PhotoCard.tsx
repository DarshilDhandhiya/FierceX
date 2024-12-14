import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Download, MapPin, Activity, Share2 } from "lucide-react";
import { Photo } from "../types";
import { usePhotoStore } from "../store/usePhotoStore";
import { useImageAspectRatio, getImageRowSpan } from "../utils/imageUtils";

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  const { likedPhotos, toggleLike } = usePhotoStore();
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = likedPhotos.has(photo.id);
  const aspectRatio = useImageAspectRatio(photo.url);
  const rowSpan = getImageRowSpan(aspectRatio);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  // Function to handle direct download
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Failed to fetch the image.");
      }
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  // Function to handle sharing
  const handleShare = async () => {
    const shareData = {
      title: photo.title,
      text: `Check out this photo: ${photo.title}`,
      url: photo.url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Image shared successfully!");
      } catch (err) {
        console.error("Error sharing the image:", err);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(photo.url);
        alert("URL copied to clipboard!");
      } catch (err) {
        console.error("Error copying URL to clipboard:", err);
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl shadow-lg"
      style={{
        gridRow: `span ${rowSpan}`,
        aspectRatio: aspectRatio ? `${aspectRatio}` : "auto",
      }}
    >
      <div className="group relative h-full" onClick={onClick}>
        <motion.img
          src={photo.url}
          alt={photo.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
        />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            >
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="text-2xl font-bold mb-2"
                >
                  {photo.title}
                </motion.h3>
                {photo.location && (
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 text-sm mb-1"
                  >
                    <MapPin size={14} />
                    <span>{photo.location}</span>
                  </motion.p>
                )}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Activity size={14} />
                  <span>{photo.photographer}</span>
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-2">
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.button
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(photo.id);
                  }}
                  className={`rounded-full bg-white/10 backdrop-blur-md p-3 
                    shadow-lg transition-colors hover:bg-white/20 
                    ${isLiked ? "text-red-500" : "text-white"}`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </motion.button>

                {/* Updated Download Button */}
                <motion.button
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(photo.url, photo.title || "photo");
                  }}
                  className="rounded-full bg-white/10 backdrop-blur-md p-3 
                    text-white shadow-lg transition-colors hover:bg-white/20"
                >
                  <Download size={18} />
                </motion.button>

                {/* Share Button */}
                <motion.button
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="rounded-full bg-white/10 backdrop-blur-md p-3 
                    text-white shadow-lg transition-colors hover:bg-white/20"
                >
                  <Share2 size={18} />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
