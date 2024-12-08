import { create } from 'zustand';
import { Photo, Category } from '../types';

interface PhotoStore {
  photos: Photo[];
  currentPhoto: Photo | null;
  likedPhotos: Set<string>;
  selectedCategory: Category;
  setCurrentPhoto: (photo: Photo | null) => void;
  toggleLike: (photoId: string) => void;
  addPhotos: (newPhotos: Photo[]) => void;
  setSelectedCategory: (category: Category) => void;
  filteredPhotos: () => Photo[];
}

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  currentPhoto: null,
  likedPhotos: new Set(),
  selectedCategory: 'All',
  setCurrentPhoto: (photo) => set({ currentPhoto: photo }),
  toggleLike: (photoId) =>
    set((state) => {
      const newLikedPhotos = new Set(state.likedPhotos);
      if (newLikedPhotos.has(photoId)) {
        newLikedPhotos.delete(photoId);
      } else {
        newLikedPhotos.add(photoId);
      }
      return { likedPhotos: newLikedPhotos };
    }),
  addPhotos: (newPhotos) =>
    set((state) => ({ photos: [...state.photos, ...newPhotos] })),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  filteredPhotos: () => {
    const state = get();
    return state.selectedCategory === 'All'
      ? state.photos
      : state.photos.filter((photo) => photo.category === state.selectedCategory);
  },
}));