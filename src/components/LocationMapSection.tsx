import React from 'react';
import { MapPin, Compass, Car, Navigation, Plane, Waves, Trees, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const LANDMARKS = [
  {
    name: "Senegambia Beach & Strip",
    category: "Beach & Dining",
    time: "3 mins",
    icon: <Waves className="w-4 h-4 text-cyan-400" />,
    description: "Famous white sand beach, beachfront seafood restaurants, and nightlife."
  },
  {
    name: "Bijilo Monkey Forest Park",
    category: "Nature & Wildlife",
    time: "5 mins",
    icon: <Trees className="w-4 h-4 text-emerald-400" />,
    description: "Lush tropical nature reserve home to green monkeys and exotic birds."
  },
  {
    name: "Brusubi Turntable & Supermarket",
    category: "Shopping & Banks",
    time: "4 mins",
    icon: <ShoppingBag className="w-4 h-4 text-amber-400" />,
    description: "Modern shopping complex, ATMs, pharmacy, and artisanal craft markets."
  },
  {
    name: "Banjul International Airport (BJL)",
    category: "Airport",
    time: "20 mins",
    icon: <Plane className="w-4 h-4 text-orange-400" />,
    description: "Direct highway access from the airport with private shuttle pickup available."
  }
];

export const LocationMapSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-orange-600/90 text-white text-xs px-3 py-1 font-semibold rounded-full mb-4 shadow-md">
            Prime Location
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Kerr Serign: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">The Heart of Coastal Gambia</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Nestled in a peaceful residential haven, steps away from pristine Atlantic beaches, vibrant restaurants, and nature reserves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map Visualizer Box */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

            {/* Map Card Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700 text-xs font-semibold text-white">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Kerr Serign, Kombo Saint Mary</span>
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/50 bg-emerald-950/60">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Safe & Quiet Neighborhood
              </Badge>
            </div>

            {/* Stylized Interactive Map Node Graphic */}
            <div className="relative z-10 my-auto py-8">
              <div className="relative max-w-md mx-auto h-48 bg-slate-950/90 rounded-2xl border border-slate-800 p-4 shadow-inner flex items-center justify-center text-center">
                <div className="absolute inset-x-8 top-1/2 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 opacity-40"></div>

                <div className="relative z-10 bg-orange-600 text-white font-bold p-3.5 rounded-2xl shadow-xl border-2 border-orange-400 flex items-center gap-2 transform scale-105">
                  <Navigation className="w-5 h-5 animate-bounce text-amber-200" />
                  <div>
                    <div className="text-xs uppercase tracking-wider text-orange-200 font-semibold">Our Apartments</div>
                    <div className="text-sm font-extrabold">Gambia Flyaway</div>
                  </div>
                </div>

                <div className="absolute -top-3 left-6 bg-cyan-900/90 text-cyan-200 text-[11px] px-2.5 py-1 rounded-full border border-cyan-700 flex items-center gap-1">
                  <Waves className="w-3 h-3 text-cyan-400" /> Beach (3m)
                </div>

                <div className="absolute -bottom-3 right-6 bg-emerald-900/90 text-emerald-200 text-[11px] px-2.5 py-1 rounded-full border border-emerald-700 flex items-center gap-1">
                  <Trees className="w-3 h-3 text-emerald-400" /> Reserve (5m)
                </div>
              </div>
            </div>

            {/* Map Footer Info */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-300 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-orange-400" />
                <span>Free On-Site Gated Parking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Airport Pickup Available</span>
              </div>
            </div>
          </div>

          {/* Landmarks Proximity Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-400" /> Proximity & Travel Times
            </h3>

            {LANDMARKS.map((landmark, idx) => (
              <Card key={idx} className="bg-slate-900/80 border-slate-800 text-white rounded-2xl hover:border-slate-700 transition-all shadow-md">
                <CardContent className="p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0 mt-0.5">
                    {landmark.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-white">{landmark.name}</h4>
                      <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] px-2 py-0.5 font-bold">
                        {landmark.time}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {landmark.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMapSection;
