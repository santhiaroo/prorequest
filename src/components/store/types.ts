export interface StoreService {
  id: string;
  name: string;
  description: string;
  price: number;
  isSubscription: boolean;
  interval?: 'month' | 'year';
  image: string;
  turnaround: string;
  features: string[];
  isPopular?: boolean;
}