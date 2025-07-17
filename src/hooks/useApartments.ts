import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Mock data for testing
const mockApartments = [
  {
    id: '1',
    name: 'Ocean View Apartment',
    location: 'Banjul, The Gambia',
    price: 150,
    rating: 4.8,
    reviews: 124,
    image_url: '/images/apartments/apartment-1-800x600.webp',
    amenities: ['Wifi', 'Parking', 'Ocean View'],
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Beachfront Villa',
    location: 'Kololi, The Gambia',
    price: 200,
    rating: 4.9,
    reviews: 89,
    image_url: '/images/apartments/apartment-3-800x600.webp',
    amenities: ['Wifi', 'Parking', 'Private Beach'],
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'City Center Loft',
    location: 'Serrekunda, The Gambia',
    price: 120,
    rating: 4.6,
    reviews: 67,
    image_url: '/images/apartments/apartment-4-800x600.webp',
    amenities: ['Wifi', 'Kitchen', 'Balcony'],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sunset Paradise Villa',
    location: 'Bakau, The Gambia',
    price: 180,
    rating: 4.9,
    reviews: 156,
    image_url: null,
    amenities: ['Wifi', 'Pool', 'Garden', 'Parking'],
    bedrooms: 3,
    bathrooms: 3,
    max_guests: 6,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Traditional Compound',
    location: 'Juffureh, The Gambia',
    price: 90,
    rating: 4.4,
    reviews: 43,
    image_url: null,
    amenities: ['Wifi', 'Cultural Tours', 'Local Cuisine'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Luxury Penthouse Suite',
    location: 'Fajara, The Gambia',
    price: 280,
    rating: 5.0,
    reviews: 92,
    image_url: null,
    amenities: ['Wifi', 'Rooftop Terrace', 'Concierge', 'Gym'],
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
