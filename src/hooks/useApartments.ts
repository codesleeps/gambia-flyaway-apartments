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
    image_url: null,
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
    image_url: null,
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
    image_url: null,
    amenities: ['Wifi', 'Kitchen', 'Balcony'],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    created_at: new Date().toISOString()
  }
];

export const useApartments = () => {
  return useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('apartments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching apartments:', error);
          // Return mock data if database fails
          return mockApartments;
        }

        // Return mock data if no apartments found
        if (!data || data.length === 0) {
          console.log('No apartments found in database, using mock data');
          return mockApartments;
        }

        return data;
      } catch (error) {
        console.error('Database connection failed, using mock data:', error);
        return mockApartments;
      }
    },
  });
};
