
-- Create apartments table
CREATE TABLE public.apartments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  image_url TEXT,
  amenities TEXT[] DEFAULT '{}',
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  apartment_id UUID REFERENCES public.apartments(id) ON DELETE CASCADE NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for apartments (public read access)
CREATE POLICY "Anyone can view apartments" 
  ON public.apartments 
  FOR SELECT 
  USING (true);

-- Create policies for bookings (users can only see their own bookings)
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Insert sample apartment data
INSERT INTO public.apartments (name, location, price, rating, reviews, image_url, amenities, bedrooms, bathrooms, max_guests, description) VALUES
('Ocean View Deluxe', 'Kololi Beach', 75.00, 4.8, 24, '/placeholder.svg', ARRAY['Ocean View', 'WiFi', 'Parking', 'AC'], 2, 2, 4, 'Beautiful ocean view apartment with modern amenities'),
('Tropical Paradise Suite', 'Senegambia Strip', 85.00, 4.9, 31, '/placeholder.svg', ARRAY['Pool View', 'WiFi', 'Balcony', 'Kitchen'], 3, 2, 6, 'Spacious suite with tropical garden views'),
('Sunset Beach Apartment', 'Kotu Beach', 65.00, 4.7, 18, '/placeholder.svg', ARRAY['Beach Access', 'WiFi', 'Terrace', 'AC'], 2, 1, 4, 'Direct beach access with stunning sunset views'),
('Garden Oasis Studio', 'Bijilo', 45.00, 4.6, 15, '/placeholder.svg', ARRAY['Garden View', 'WiFi', 'Kitchenette', 'AC'], 1, 1, 2, 'Cozy studio surrounded by lush gardens'),
('Luxury Beach Villa', 'Cape Point', 120.00, 5.0, 42, '/placeholder.svg', ARRAY['Private Beach', 'WiFi', 'Pool', 'Butler'], 4, 3, 8, 'Exclusive villa with private beach and pool'),
('Cozy City Retreat', 'Serrekunda', 35.00, 4.5, 12, '/placeholder.svg', ARRAY['City Center', 'WiFi', 'Market Access', 'AC'], 1, 1, 3, 'Central location perfect for exploring local markets');
