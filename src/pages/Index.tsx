import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Car, Waves, Users, Sparkles, Shield, Compass, Heart } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApartmentCard from "../components/ApartmentCard";
import SearchFilterBar, { FilterState } from "../components/SearchFilterBar";
import ReviewsSection from "../components/ReviewsSection";
import { useApartments } from "../hooks/useApartments";
import { Skeleton } from "@/components/ui/skeleton";

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
          <source media="(min-width: 1024px)" srcSet="images/hero/hero-1920x1080.webp" type="image/webp" />
          <source media="(min-width: 768px)" srcSet="images/hero/hero-1280x720.webp" type="image/webp" />
          <source srcSet="images/hero/hero-800x600.webp" type="image/webp" />
          <img
            src="images/hero/hero-800x600.jpg"
            alt="Beautiful Gambia apartment complex with tropical vegetation"
            className="absolute inset-0 w-full h-full object-cover z-0 scale-105 transform animate-pulse-slow"
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

      {/* Gambian Attractions Showcase */}
      <section id="attractions" className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-14">
            <Badge className="bg-orange-500/20 text-orange-400 border-0 px-3 py-1 mb-3 text-xs">
              Explore The Gambia
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Discover The Smiling Coast
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              From golden sandy beaches to wildlife sanctuaries and vibrant craft markets.
            </p>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
                <Waves className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">80km Coastline</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Pristine Atlantic ocean beaches with warm water, beach bars, and sunsets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Nature Reserves</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Bijilo Forest Park & Abuko Nature Reserve with monkeys and 560+ bird species.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Rich Culture</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Traditional kora music, vibrant markets, and mouth-watering Domoda peanut stew.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-orange-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Warm Hospitality</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Renowned friendliness makes The Gambia one of the safest African destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
