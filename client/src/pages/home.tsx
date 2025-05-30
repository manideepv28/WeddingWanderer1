import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Users, Plane } from "lucide-react";

interface HomeProps {
  onExploreClick: () => void;
}

export function Home({ onExploreClick }: HomeProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-rose-50 to-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`,
          }}
        />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Celebrate Love
              <span className="block text-rose-300">Around the World</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Join unforgettable destination weddings and create memories that last a lifetime.
              Discover beautiful ceremonies in breathtaking locations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onExploreClick}
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                Explore Weddings
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Why Choose WeddingWander?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the magic of destination weddings with our curated collection of ceremonies worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Global Destinations</h3>
                <p className="text-gray-600">
                  From tropical beaches to mountain tops, discover weddings in the most beautiful locations worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Curated Experiences</h3>
                <p className="text-gray-600">
                  Each wedding is carefully selected to ensure an unforgettable celebration of love and culture
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4">Community</h3>
                <p className="text-gray-600">
                  Connect with fellow travelers and celebrate love together in extraordinary settings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join magical wedding celebrations around the world in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Discover</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through amazing destination weddings around the world. Filter by location, date, and style to find your perfect celebration.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Register</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your account and register for weddings that inspire you. Connect with couples and fellow travelers planning to attend.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">Celebrate</h3>
              <p className="text-gray-600 leading-relaxed">
                Travel to amazing destinations and celebrate love with couples from around the world. Create unforgettable memories together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Discover some of our most popular wedding locations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Tuscany, Italy",
                description: "Vineyard ceremonies among rolling hills",
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
              },
              {
                name: "Santorini, Greece",
                description: "Clifftop ceremonies with ocean views",
                image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
              },
              {
                name: "Bali, Indonesia",
                description: "Tropical paradise ceremonies",
                image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
              },
              {
                name: "Provence, France",
                description: "Lavender field celebrations",
                image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
              },
            ].map((destination) => (
              <Card key={destination.name} className="overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-serif font-semibold text-xl mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm">{destination.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Join couples from around the world and be part of their most magical moments
          </p>
          <Button
            onClick={onExploreClick}
            size="lg"
            className="bg-white text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold"
          >
            <Plane className="mr-2 h-5 w-5" />
            Explore Weddings Now
          </Button>
        </div>
      </section>
    </div>
  );
}
