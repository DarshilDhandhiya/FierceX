import { Photo } from './types';

export const samplePhotos: Photo[] = [
  {
    id: 'photo-1',
    url: '/Pics/Sunny-Shaam.jpg',
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
    url: './Pics/Sunny-Shaam.jpg',
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
  // Add remaining photos here...
];
