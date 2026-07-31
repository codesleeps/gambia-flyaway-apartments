import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Waves, Heart, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal';
import { toast } from 'sonner';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image_url: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
}

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if apartment is in local favorites
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('gambia_favs') || '[]');
      setIsFavorite(favs.includes(apartment.id));
    } catch (e) {
      console.error(e);
    }
  }, [apartment.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('gambia_favs') || '[]');
      let updatedFavs: string[];
      if (favs.includes(apartment.id)) {
        updatedFavs = favs.filter((id) => id !== apartment.id);
        toast.info(`Removed ${apartment.name} from wishlist`);
      } else {
        updatedFavs = [...favs, apartment.id];
        toast.success(`Saved ${apartment.name} to wishlist! ❤️`);
      }
      localStorage.setItem('gambia_favs', JSON.stringify(updatedFavs));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error(err);
    }
  };

  // Get image URL based on apartment ID
  const getImageUrl = () => {
    const base = window.location.origin + import.meta.env.BASE_URL;
    const imageMap = {
      '1': new URL('images/apartments/apartment-1-800x600.jpg', base).href,
      '2': new URL('images/apartments/apt2-800x600.jpg', base).href,
      '3': new URL('images/apartments/apartment-3-800x600.jpg', base).href,
      '4': new URL('images/apartments/apartment-4-800x600.jpg', base).href,
      '5': new URL('images/apartments/apt5_800x600.jpg', base).href,
      '6': new URL('images/apartments/apt6-800x600.jpg', base).href
    };
    return imageMap[apartment.id as keyof typeof imageMap] || new URL('images/apartments/apartment-1-800x600.jpg', base).href;
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3.5 h-3.5" />;
      case 'parking':
        return <Car className="w-3.5 h-3.5" />;
      default:
        return <Waves className="w-3.5 h-3.5" />;
    }
  };

  const handleBookNow = () => {
    if (!user) {
      toast.info('Please log in to make a booking reservation');
      navigate('/auth');
      return;
    }
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <Card className="card-hover border border-gray-100 overflow-hidden group bg-white shadow-sm hover:shadow-xl rounded-2xl flex flex-col justify-between h-full">
        <CardHeader className="p-0 relative">
          <div className="relative h-56 bg-slate-100 overflow-hidden">
            <img
              src={getImageUrl()}
              alt={`${apartment.name} in ${apartment.location}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                const base = window.location.origin + import.meta.env.BASE_URL;
                e.currentTarget.src = new URL('images/apartments/apartment-1-800x600.jpg', base).href;
              }}
            />

            {/* Price Tag Overlay */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-0 text-xs px-3 py-1 font-bold shadow-lg">
                ${apartment.price} <span className="font-normal text-[10px] text-gray-300 ml-0.5">/ night</span>
              </Badge>
            </div>

            {/* Rating Overlay */}
            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 shadow-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-gray-900">{apartment.rating}</span>
              <span className="text-[10px] text-muted-foreground">({apartment.reviews})</span>
            </div>

            {/* Favorite Heart Button */}
            <button
              onClick={toggleFavorite}
              aria-label="Save to wishlist"
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all text-gray-700 hover:text-red-500"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
              />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-5 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                <span className="font-medium">{apartment.location}</span>
              </div>
              <div className="flex items-center text-emerald-600 font-medium text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
              </div>
            </div>

            <h3 className="text-base font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
              {apartment.name}
            </h3>

            {/* Specs Bar */}
            <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-gray-50 rounded-xl text-xs text-gray-600 mb-4 border border-gray-100">
              <div className="flex items-center gap-1.5 justify-center">
                <Bed className="w-3.5 h-3.5 text-primary" />
                <span>{apartment.bedrooms} {apartment.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center border-x border-gray-200 px-1">
                <Bath className="w-3.5 h-3.5 text-primary" />
                <span>{apartment.bathrooms} Bath</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>{apartment.max_guests} Guests</span>
              </div>
            </div>

            {/* Amenities Chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {apartment.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="secondary" className="text-[11px] bg-slate-100 text-gray-700 font-normal">
                  {getAmenityIcon(amenity)}
                  <span className="ml-1">{amenity}</span>
                </Badge>
              ))}
              {apartment.amenities.length > 3 && (
                <Badge variant="outline" className="text-[11px] text-muted-foreground border-dashed">
                  +{apartment.amenities.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <Button
            className="w-full booking-gradient text-white hover:opacity-95 font-semibold text-sm rounded-xl py-2.5 shadow-md shadow-orange-500/20"
            onClick={handleBookNow}
          >
            {user ? 'Reserve Apartment' : 'Login to Reserve'}
          </Button>
        </CardContent>
      </Card>

      <BookingModal
        apartment={apartment}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default ApartmentCard;
