import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Mock data for testing
const mockApartments = [
  {
    id: '1',
    name: 'Harmony Apartment 1',
    location: 'Kerr Serign, The Gambia',
    price: 25,
    rating: 4.9,
    reviews: 124,
    image_url: '/images/apartments/harmony-apt-1-lounge.jpg',
    images: [
      '/images/apartments/harmony-apt-1-lounge.jpg',
      '/images/apartments/harmony-apt-1-bedroom.jpg',
      { src: '/images/apartments/harmony-apt-1-bedroom-a.jpg', label: 'Bathroom' },
      '/images/apartments/harmony-apt-1-kitchen.jpg'
    ],
    amenities: ['Wifi', 'Air Conditioning', 'Kitchenette', 'Garden View'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Harmony Apartment 2',
    location: 'Kerr Serign, The Gambia',
    price: 25,
    rating: 4.8,
    reviews: 89,
    image_url: '/images/apartments/harmony-apt-2-lounge.jpg',
    images: [
      '/images/apartments/harmony-apt-2-lounge.jpg',
      '/images/apartments/harmony-apt-2-bedroom.jpg',
      '/images/apartments/harmony-apt-2-bathroom.jpg',
      { src: '/images/apartments/harmony-apt-2-bedrrom-b.jpg', label: 'Kitchen' }
    ],
    amenities: ['Wifi', 'Air Conditioning', 'Patio', 'Free Parking'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Harmony Apartment 3',
    location: 'Kerr Serign, The Gambia',
    price: 25,
    rating: 4.7,
    reviews: 67,
    image_url: '/images/apartments/harmony-apt-3-lounge.jpg',
    images: [
      '/images/apartments/harmony-apt-3-lounge.jpg',
      { src: '/images/apartments/harmony-apt-3-lounge-a.jpg', label: 'Bedroom' },
      { src: '/images/apartments/harmony-apt-3-lounge-b.jpg', label: 'Bathroom' },
      '/images/apartments/harmony-apt-3-kitchen.jpg'
    ],
    amenities: ['Wifi', 'Kitchen', 'Balcony', 'TV'],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Harmony Apartment 5',
    location: 'Kerr Serign, The Gambia',
    price: 25,
    rating: 4.9,
    reviews: 43,
    image_url: '/images/apartments/harmony-apt-5-lounge.jpg',
    images: [
      '/images/apartments/harmony-apt-5-lounge.jpg',
      '/images/apartments/harmony-apt-5-bedroom.jpg',
      { src: '/images/apartments/harmony-apt-5-bedroom-a.jpg', label: 'Bathroom' },
      '/images/apartments/harmony-apt-5-kitchen.jpg'
    ],
    amenities: ['Wifi', 'Air Conditioning', 'Kitchen', 'Garden View'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Harmony Apartment 6',
    location: 'Kerr Serign, The Gambia',
    price: 30,
    rating: 5.0,
    reviews: 92,
    image_url: '/images/apartments/harmony-apt-6-lounge.jpg',
    images: [
      '/images/apartments/harmony-apt-6-lounge.jpg',
      '/images/apartments/harmony-apt-6-bedroom-a.jpg',
      { src: '/images/apartments/harmony-apt-6-lounge-a.jpg', label: 'Bathroom' },
      '/images/apartments/harmony-apt-6-kitchen.jpg'
    ],
    amenities: ['Wifi', 'Air Conditioning', 'Terrace', 'Luxury Lounge'],
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    created_at: new Date().toISOString()
  }
];

export const useApartments = () => {
  return useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      // Always return mock data for now to ensure the app works
      console.log('Using mock data for apartments');
      return mockApartments;
      
      // Uncomment below to try database connection
      /*
      try {
        const { data, error } = await supabase
          .from('apartments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching apartments:', error);
          return mockApartments;
        }

        if (!data || data.length === 0) {
          console.log('No apartments found in database, using mock data');
          return mockApartments;
        }

        return data;
      } catch (error) {
        console.error('Database connection failed, using mock data:', error);
        return mockApartments;
      }
      */
    },
  });
};
