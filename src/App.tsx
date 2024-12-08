import React, { useState, useEffect } from 'react';
import { usePhotoStore } from './store/usePhotoStore';
import { Header } from './components/Header'
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import { Photo } from './types';

// Sample photos data with categories
const samplePhotos: Photo[] = [
  {
    id: 'photo-1',
    url: 'https://fiercexd.s3.us-east-1.amazonaws.com/Pics/IMG20240718193009.jpg',
    title: 'Mountain Landscape',
    photographer: 'John Doe',
    location: 'Swiss Alps',
    category: 'Mountain',
    camera: {
      model: 'Canon EOS R5',
      settings: {
        aperture: '2.8',
        shutterSpeed: '1/1000',
        iso: 100,
      },
    },
    likes: 150,
    downloads: 50,
  },
  {
    id: 'photo-2',
    url: '/Pics/1.jpg',
    title: 'Lake Sunset',
    photographer: 'Jane Smith',
    location: 'Maldives',
    category: 'Ocean',
    camera: {
      model: 'Sony A7III',
      settings: {
        aperture: '4.0',
        shutterSpeed: '1/200',
        iso: 400,
      },
    },
    likes: 200,
    downloads: 75,
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1',
    title: 'Urban Architecture',
    photographer: 'Mike Johnson',
    location: 'Tokyo, Japan',
    category: 'City',
    camera: {
      model: 'Fujifilm X-T4',
      settings: {
        aperture: '5.6',
        shutterSpeed: '1/500',
        iso: 200,
      },
    },
    likes: 180,
    downloads: 60,
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9',
    title: 'Desert Dunes',
    photographer: 'Sarah Williams',
    location: 'Sahara Desert',
    category: 'Mountain',
    camera: {
      model: 'Nikon Z6',
      settings: {
        aperture: '8.0',
        shutterSpeed: '1/2000',
        iso: 100,
      },
    },
    likes: 250,
    downloads: 90,
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f',
    title: 'Forest Mist',
    photographer: 'David Chen',
    location: 'Pacific Northwest',
    category: 'Forest',
    camera: {
      model: 'Sony A7R IV',
      settings: {
        aperture: '1.8',
        shutterSpeed: '1/125',
        iso: 800,
      },
    },
    likes: 300,
    downloads: 120,
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1682686580024-580519d4b2d2',
    title: 'Northern Lights',
    photographer: 'Emma Anderson',
    location: 'Iceland',
    category: 'Sky',
    camera: {
      model: 'Canon EOS R6',
      settings: {
        aperture: '2.0',
        shutterSpeed: '15',
        iso: 3200,
      },
    },
    likes: 400,
    downloads: 150,
  }
];

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