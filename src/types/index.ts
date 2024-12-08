export interface Photo {
  id: string;
  url: string;
  title: string;
  photographer: string;
  location?: string;
  category: string;
  camera?: {
    model: string;
    settings: {
      aperture: string;
      shutterSpeed: string;
      iso: number;
    };
  };
  likes: number;
  downloads: number;
}

export type Category = 'All' | 'Sky' | 'Mountain' | 'City' | 'Ocean' | 'Forest';