import React, { useState, useEffect, Suspense } from 'react';
import { usePhotoStore } from './store/usePhotoStore';
import { Header } from './components/Header';
import PhotoGrid from './components/PhotoGrid';
import Footer from './components/Footer';
import { samplePhotos } from './photoData';

const Lightbox = React.lazy(() => import('./components/Lightbox'));

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { currentPhoto, setCurrentPhoto, addPhotos, filteredPhotos } = usePhotoStore();

  useEffect(() => {
    // Simulate fetching photos
    setTimeout(() => {
      addPhotos(samplePhotos);
      setIsLoading(false); // Set loading to false after fetching
    }, 2000); // Simulate network delay
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
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader"></div> {/* Loading spinner */}
          </div>
        ) : (
          <PhotoGrid photos={filteredPhotos()} onPhotoClick={setCurrentPhoto} />
        )}
      </main>

      <Footer />
      {currentPhoto && (
        <Suspense fallback={<div>Loading Lightbox...</div>}>
          <Lightbox
            photo={currentPhoto}
            onClose={() => setCurrentPhoto(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
