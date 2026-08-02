import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Waves, Users, Sparkles, Shield, Compass, Utensils, Trees, Landmark, Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApartmentCard from "../components/ApartmentCard";
import SearchFilterBar, { FilterState } from "../components/SearchFilterBar";
import ReviewsSection from "../components/ReviewsSection";
import { useApartments } from "../hooks/useApartments";
import { Skeleton } from "@/components/ui/skeleton";
import { getImagePath, handleImageError } from "@/utils/imageUtils";

interface Attraction {
  id: string;
  title: string;
  category: string;
  image: string;
  fallbackGradient: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const attractionsData: Attraction[] = [
  {
    id: "beaches",
    title: "Pristine Atlantic Beaches",
    category: "Coastline",
    image: "images/attractions/beach.png",
    fallbackGradient: "from-blue-600 via-cyan-600 to-teal-500",
    description: "Miles of golden sandy beaches along the Atlantic coast, perfect for swimming, sunbathing, and sunset cocktails.",
    highlights: ["Kotu Beach & Sun loungers", "Bijilo Golden Coast", "Senegambia Sunset Strip"],
    icon: <Waves className="w-5 h-5 text-cyan-400" />
  },
  {
    id: "parks",
    title: "Lush Natural Reserves",
    category: "Wildlife",
    image: "images/attractions/park.png",
    fallbackGradient: "from-emerald-700 via-green-600 to-teal-600",
    description: "Explore lush tropical rainforest sanctuaries teeming with exotic monkeys, colorful kingfishers, and over 560 bird species.",
    highlights: ["Bijilo Monkey Forest Park", "Abuko Nature Reserve", "River Gambia Safari"],
    icon: <Trees className="w-5 h-5 text-emerald-400" />
  },
  {
    id: "cuisine",
    title: "Authentic Local Cuisine",
    category: "Gastronomy",
    image: "images/attractions/cuisine.png",
    fallbackGradient: "from-amber-600 via-orange-600 to-red-600",
    description: "Savor authentic Gambian culinary delights, from savory Domoda peanut stew to fresh wild Atlantic snapper and tiger prawns.",
    highlights: ["Domoda Peanut Stew", "Fresh Atlantic Seafood", "Albert Market Spice Stalls"],
    icon: <Utensils className="w-5 h-5 text-amber-400" />
  },
  {
    id: "culture",
    title: "Vibrant Cultural Scenery",
    category: "Heritage",
    image: "images/attractions/culture.png",
    fallbackGradient: "from-purple-700 via-indigo-700 to-slate-800",
    description: "Immerse yourself in authentic Gambian heritage, kora string music, hand-carved wooden sculptures, and warm village hospitality.",
    highlights: ["Serrekunda Craft Market", "Traditional Kora Music", "Historical Juffureh Village"],
    icon: <Landmark className="w-5 h-5 text-purple-400" />
  }
];

const Index = () => {
  const { data: apartments, isLoading, error } = useApartments();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    location: "All Locations",
    priceRange: "all",
    bedrooms: "all",
    sortBy: "recommended",
    searchQuery: "",
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: "All Locations",
      priceRange: "all",
      bedrooms: "all",
      sortBy: "recommended",
      searchQuery: "",
    });
  };

  // Filter & Sort Apartments
  const filteredApartments = useMemo(() => {
    if (!apartments) return [];

    return apartments
      .filter((apt) => {
        // Location filter
        if (filters.location !== "All Locations" && apt.location.toLowerCase() !== filters.location.toLowerCase()) {
          return false;
        }

        // Search Query filter
        if (filters.searchQuery.trim() !== "") {
          const q = filters.searchQuery.toLowerCase();
          const matchesName = apt.name.toLowerCase().includes(q);
          const matchesLoc = apt.location.toLowerCase().includes(q);
          if (!matchesName && !matchesLoc) return false;
        }

        // Bedrooms filter
        if (filters.bedrooms !== "all") {
          const reqBeds = parseInt(filters.bedrooms);
          if (apt.bedrooms < reqBeds) return false;
        }

        // Price range filter
        if (filters.priceRange === "under-100" && apt.price >= 100) return false;
        if (filters.priceRange === "100-200" && (apt.price < 100 || apt.price > 200)) return false;
        if (filters.priceRange === "over-200" && apt.price <= 200) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating-desc") return b.rating - a.rating;
        return 0; // recommended
      });
  }, [apartments, filters]);

  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById("apartments");
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[550px] md:min-h-[650px] flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Background Responsive Image */}
        <picture className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <source media="(min-width: 1024px)" srcSet={getImagePath("images/hero/hero-1920x1080.webp")} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={getImagePath("images/hero/hero-1280x720.webp")} type="image/webp" />
          <source srcSet={getImagePath("images/hero/hero-800x600.webp")} type="image/webp" />
          <img
            src={getImagePath("images/hero/hero-800x600.jpg")}
            alt="Beautiful Gambia apartment complex with tropical vegetation"
            className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transform animate-pulse-slow"
            onError={(e) => handleImageError(e, '/images/hero/hero-800x600.jpg')}
          />
        </picture>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-slate-900/30 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto text-center text-white flex flex-col items-center justify-center h-full pt-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 text-amber-300 shadow-lg">
            <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>The Smiling Coast of Africa</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            Discover Paradise in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">The Gambia</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto text-slate-200 font-light leading-relaxed">
            Experience luxury, privacy, and ocean breezes in our handpicked apartments across Kololi, Serrekunda, and Banjul.
          </p>

          {/* Floating Action Stats Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 text-xs sm:text-sm">
            <div className="glass-pill px-4 py-2 rounded-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Properties</span>
            </div>
            <div className="glass-pill px-4 py-2 rounded-xl flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.98 Avg Rating (200+ stays)</span>
            </div>
            <div className="glass-pill px-4 py-2 rounded-xl flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>6 Coastal Locations</span>
            </div>
          </div>

          <Button
            size="lg"
            className="booking-gradient text-white text-base sm:text-lg font-semibold px-8 py-6 rounded-2xl shadow-2xl hover:scale-105 transition-all"
            onClick={scrollToApartments}
          >
            Explore Apartments
          </Button>
        </div>
      </section>

      {/* Main Apartment Showcase Section */}
      <section id="apartments" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">
              Our Premium Apartments
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your ideal home away from home with luxury amenities, beach access, and authentic hospitality.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            totalResults={filteredApartments.length}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden rounded-2xl border-0 shadow-md">
                  <Skeleton className="h-56 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100 max-w-md mx-auto">
              <p className="text-red-600 font-semibold mb-2">Error loading properties</p>
              <p className="text-xs text-red-500">{error.message}</p>
            </div>
          ) : filteredApartments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-lg mx-auto p-8">
              <div className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matching apartments found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Try adjusting your search criteria or resetting filters to view all properties.
              </p>
              <Button onClick={handleResetFilters} className="bg-primary hover:bg-primary/90 text-sm">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guest Reviews Section */}
      <ReviewsSection />

      {/* Discover The Gambia's Treasures */}
      <section id="attractions" className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-14">
            <Badge className="bg-orange-500/20 text-orange-400 border-0 px-3.5 py-1 mb-3 text-xs font-semibold">
              Explore The Smiling Coast
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Discover The Gambia's Treasures
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-light">
              From pristine Atlantic golden beaches to exotic wildlife sanctuaries and rich local heritage.
            </p>
          </div>

          {/* Fact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-5 py-2.5 flex items-center gap-2.5 text-orange-400 font-semibold text-xs sm:text-sm shadow-md">
              <span className="text-base">🦜</span> 560+ Exotic Bird Species
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-5 py-2.5 flex items-center gap-2.5 text-cyan-400 font-semibold text-xs sm:text-sm shadow-md">
              <span className="text-base">🏖️</span> 80km Atlantic Coastline
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-5 py-2.5 flex items-center gap-2.5 text-amber-400 font-semibold text-xs sm:text-sm shadow-md">
              <span className="text-base">☀️</span> Year-Round Sun & Warmth
            </div>
          </div>

          {/* 4 Attraction Cards with Real Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {attractionsData.map((item) => (
              <Card key={item.id} className="card-hover bg-slate-800/90 border border-slate-700/70 overflow-hidden group rounded-2xl flex flex-col justify-between h-full shadow-xl">
                <div>
                  {/* Card Image Box */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={getImagePath(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const step = parseInt(target.dataset.errorStep || '0');
                        if (step === 0) {
                          target.dataset.errorStep = '1';
                          target.src = `/${item.image}`;
                        } else if (step === 1) {
                          target.dataset.errorStep = '2';
                          target.src = `images/attractions/${item.id}.png`;
                        } else if (step === 2) {
                          target.dataset.errorStep = '3';
                          target.src = `https://raw.githubusercontent.com/codesleeps/gambia-flyaway-apartments/main/public/${item.image}`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                    
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className="bg-slate-950/80 text-white border border-white/20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-0.5">
                        {item.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-slate-950/80 border border-white/10 backdrop-blur-md">
                        {item.icon}
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight drop-shadow-md">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <CardContent className="p-5">
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-700/60">
                      {item.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-orange-400 mr-2 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.visitthegambia.gm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="booking-gradient text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-xl hover:scale-105 transition-all">
                Explore All Gambia Attractions
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
