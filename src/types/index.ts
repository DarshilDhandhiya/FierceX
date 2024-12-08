export interface Photo {
  id: string;
  url: string;
  title: string;
  photographer: string;
  location?: string;
  category: string;
}

export type Category = 'All' | 'Sky' | 'Mountain' | 'Lake' | 'Ocean' | 'Forest';