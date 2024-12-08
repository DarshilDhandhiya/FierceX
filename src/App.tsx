import React, { useState, useEffect } from 'react';
import { usePhotoStore } from './store/usePhotoStore';
import { Header } from './components/Header';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import { samplePhotos } from './photoData'; // Import photo data

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { currentPhoto, setCurrentPhoto, addPhotos, filteredPhotos } = usePhotoStore();

  useEffect(() => {
    // Load initial photos
    addPhotos(samplePhotos);
  }, [addPhotos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePrevious = () => {
    if (!currentPhoto) return;
    const photos = filteredPhotos();
    const currentIndex = photos.findIndex((p) => p.id === currentPhoto.id);
    const previousIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentPhoto(photos[previousIndex]);
  };

  const handleNext = () => {
    if (!currentPhoto) return;
    const photos = filteredPhotos();
    const currentIndex = photos.findIndex((p) => p.id === currentPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentPhoto(photos[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-900 dark:text-white">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <main className="container mx-auto py-8">
        <PhotoGrid photos={filteredPhotos()} onPhotoClick={setCurrentPhoto} />
      </main>
      <Footer />

      {currentPhoto && (
        <Lightbox
          photo={currentPhoto}
          onClose={() => setCurrentPhoto(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default App;
