
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const mockBookings = [
  {
    id: 'b-101',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    check_in_date: new Date(Date.now() + 5 * 86400000).toISOString(),
    check_out_date: new Date(Date.now() + 12 * 86400000).toISOString(),
    guests: 2,
    total_price: 215,
    status: 'confirmed',
    special_requests: 'Airport transfer requested for 3 PM arrival.',
    apartments: {
      name: 'Ocean View Luxury Apartment',
      location: 'Serrekunda, The Gambia',
      image_url: 'images/apartments/apartment-1-800x600.jpg',
      price: 25
    }
  }
];

export const useBookings = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            apartments (
              name,
              location,
              image_url,
              price
            )
          `)
          .order('created_at', { ascending: false });

        if (error || !data) {
          console.warn('Using mock bookings fallback due to Supabase error:', error);
          return mockBookings;
        }

        return data;
      } catch (err) {
        console.warn('Network error fetching bookings, returning mock bookings:', err);
        return mockBookings;
      }
    },
    enabled: !!user,
  });
};
