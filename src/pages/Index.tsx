import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Wifi, Car, Waves, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ApartmentCard from '../components/ApartmentCard';
import { useApartments } from '../hooks/useApartments';
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: apartments, isLoading, error } = useApartments();

  const scrollToApartments = () => {
    const apartmentsSection = document.getElementById('apartments');
    if (apartmentsSection) {
      apartmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient py-24 px-4">
        {/* Content */}
        <div className="relative z-10 container mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Paradise in The Gambia
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience luxury and comfort in our stunning apartments across The Gambia's most beautiful locations
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
            onClick={scrollToApartments}
          >
            Explore Our Apartments
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Welcome to <span className="text-primary">Gambia Stay</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are passionate about providing exceptional accommodation experiences in The Gambia, 
                a country known for its stunning beaches, rich culture, and warm hospitality. Our 
                carefully curated collection of apartments offers the perfect blend of comfort, 
                luxury, and authentic Gambian charm.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're seeking a romantic getaway, a family vacation, or a business trip, 
                our properties are strategically located in prime areas, offering easy access to 
                beautiful beaches, local markets, and cultural attractions. Each apartment is 
                thoughtfully designed to ensure your stay is nothing short of extraordinary.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-gray-600">Happy Guests</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">6</div>
                  <div className="text-sm text-gray-600">Premium Locations</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/20 to-orange-200/30 rounded-lg p-6 h-48 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Prime Beach Locations</h3>
                      <p className="text-gray-600 text-sm break-words">
                        All our apartments are located near beautiful beaches in The Gambia
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100/50 to-primary/10 rounded-lg p-6 h-48 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">5-Star Quality</h3>
                      <p className="text-gray-600 text-sm">
                        Every property meets our high standards for comfort, cleanliness, and amenities
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-orange-100/50 to-yellow-200/30 rounded-lg p-6 h-48 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Local Experience</h3>
                      <p className="text-gray-600 text-sm">
                        Immerse yourself in authentic Gambian culture and hospitality
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100/50 to-emerald-200/30 rounded-lg p-6 h-48 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                        <Wifi className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Modern Amenities</h3>
                      <p className="text-gray-600 text-sm">
                        Enjoy modern comforts while experiencing the beauty of The Gambia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section id="apartments" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Beautiful Apartments</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of carefully selected apartments, each offering unique experiences and stunning views
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading apartments: {error.message}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments?.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-muted-foreground">
                All apartments located near beautiful beaches and key attractions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">5-Star Service</h3>
              <p className="text-muted-foreground">
                Exceptional hospitality and personalized service for every guest
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect for Groups</h3>
              <p className="text-muted-foreground">
                Accommodations suitable for couples, families, and large groups
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section id="attractions" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Discover The Gambia's Treasures</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From pristine beaches to vibrant local culture, explore the natural beauty and rich experiences that make The Gambia truly special
            </p>
          </div>

          {/* Fact Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
            <div className="bg-primary/10 rounded-lg px-6 py-3 flex items-center gap-2 text-primary font-semibold text-base shadow-sm">
              <span role="img" aria-label="Bird">🦜</span> 560+ bird species
            </div>
            <div className="bg-primary/10 rounded-lg px-6 py-3 flex items-center gap-2 text-primary font-semibold text-base shadow-sm">
              <span role="img" aria-label="Coastline">🏖️</span> 80km Atlantic coastline
            </div>
            <div className="bg-primary/10 rounded-lg px-6 py-3 flex items-center gap-2 text-primary font-semibold text-base shadow-sm">
              <span role="img" aria-label="Sun">☀️</span> Year-round sunshine
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Beaches */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center">
                <Waves className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Pristine Beaches</h3>
                <p className="text-muted-foreground mb-4">
                  Miles of golden sandy beaches along the Atlantic coast, perfect for swimming, sunbathing, and water sports
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Kotu Beach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Bijilo Beach</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Senegambia Beach</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Parks */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-300 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Natural Parks</h3>
                <p className="text-muted-foreground mb-4">
                  Explore lush national parks and wildlife reserves teeming with exotic birds and diverse wildlife
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Abuko Nature Reserve</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Bijilo Forest Park</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>River Gambia National Park</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Cuisine */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-300 flex items-center justify-center">
                <Star className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Local Cuisine</h3>
                <p className="text-muted-foreground mb-4">
                  Savor authentic Gambian flavors with fresh seafood, traditional dishes, and vibrant street food culture
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Domoda (Peanut Stew)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Fresh Seafood</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Local Markets</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenery */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center">
                <Users className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Cultural Scenery</h3>
                <p className="text-muted-foreground mb-4">
                  Immerse yourself in vibrant local culture, traditional villages, and breathtaking river views
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Traditional Villages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>River Gambia Views</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <span>Local Craft Markets</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.visitthegambia.gm/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore All Attractions
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
