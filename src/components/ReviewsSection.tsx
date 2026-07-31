import React from 'react';
import { Star, Quote, CheckCircle2, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  apartmentName: string;
  comment: string;
  verified: boolean;
}

const reviewsData: Review[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'March 2026',
    apartmentName: 'Ocean View Luxury Apartment',
    comment: 'The balcony view over Serrekunda beach was unbelievable! The host greeted us with fresh local fruit juice and organized our airport transfer. Can’t wait to come back!',
    verified: true,
  },
  {
    id: '2',
    name: 'Marcus Vance',
    location: 'Stockholm, Sweden',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'February 2026',
    apartmentName: 'Beachfront Villa Serrekunda',
    comment: 'Immaculate villa right on Kololi beach. High-speed wifi, cold AC, and 24/7 security made our family stay smooth and completely stress-free.',
    verified: true,
  },
  {
    id: '3',
    name: 'Amadou Touray',
    location: 'Dakar, Senegal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'January 2026',
    apartmentName: 'City Center Loft Banjul',
    comment: 'Super convenient location near the Banjul markets and embassy district. Very stylish interior and super friendly staff!',
    verified: true,
  },
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
            <Star className="w-4 h-4 fill-primary" /> Verified Guest Experiences
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Loved by Travelers Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read authentic reviews from guests who experienced luxury, comfort, and Gambian hospitality at our apartments.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <Card key={review.id} className="card-hover border border-gray-100 shadow-md relative overflow-hidden bg-white/90 backdrop-blur-sm">
              <div className="absolute top-4 right-4 text-orange-200/50">
                <Quote className="w-12 h-12" />
              </div>
              <CardContent className="p-6 relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-gray-700 ml-1">5.0</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-primary/20">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                        {review.name}
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                        )}
                      </h4>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>

                  <Badge variant="secondary" className="text-[10px] bg-orange-100/60 text-orange-800 border-0">
                    {review.apartmentName.split(' ')[0]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rating Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-4xl font-extrabold flex items-center justify-center md:justify-start gap-2">
                4.98 <Star className="w-8 h-8 fill-yellow-300 text-yellow-300 inline" />
              </div>
              <p className="text-white/80 text-sm mt-1">Average rating across 200+ stays</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <ThumbsUp className="w-4 h-4 text-yellow-300" /> 99% Recommendation Rate
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Verified Host Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
