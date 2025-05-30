import { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Heart, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useEvents } from "@/hooks/use-events";
import { useLocation } from "wouter";
import LocalStorage from "@/lib/storage";
import { WeddingEvent, Registration } from "@shared/schema";

export function Dashboard() {
  const { user } = useAuth();
  const { unregisterFromEvent } = useEvents();
  const [, setLocation] = useLocation();
  const [userRegistrations, setUserRegistrations] = useState<Registration[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<WeddingEvent[]>([]);

  useEffect(() => {
    if (!user) {
      setLocation("/");
      return;
    }

    // Load user registrations and corresponding events
    const registrations = LocalStorage.getUserRegistrations(user.id);
    setUserRegistrations(registrations);

    const events = registrations.map(reg => LocalStorage.getEventById(reg.eventId)).filter(Boolean) as WeddingEvent[];
    setRegisteredEvents(events);
  }, [user, setLocation]);

  const handleUnregister = async (eventId: string) => {
    if (!user) return;
    
    const confirmed = window.confirm("Are you sure you want to unregister from this wedding?");
    if (!confirmed) return;

    const success = await unregisterFromEvent(eventId, user.id);
    if (success) {
      // Refresh the data
      const registrations = LocalStorage.getUserRegistrations(user.id);
      setUserRegistrations(registrations);
      
      const events = registrations.map(reg => LocalStorage.getEventById(reg.eventId)).filter(Boolean) as WeddingEvent[];
      setRegisteredEvents(events);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const upcomingEvents = registeredEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = registeredEvents.filter(event => new Date(event.date) <= new Date());
  const uniqueCountries = new Set(registeredEvents.map(event => event.country)).size;

  if (!user) {
    return null; // This will redirect via useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your wedding registrations and discover new celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Registrations</span>
                    <span className="font-bold text-rose-600 text-lg">{registeredEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upcoming Events</span>
                    <span className="font-bold text-blue-600 text-lg">{upcomingEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Countries Visited</span>
                    <span className="font-bold text-green-600 text-lg">{uniqueCountries}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Registered Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">My Registered Weddings</CardTitle>
              </CardHeader>
              <CardContent>
                {registeredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No registered events yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start exploring and register for beautiful weddings around the world
                    </p>
                    <Button
                      onClick={() => setLocation("/events")}
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      Browse Weddings
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Upcoming Events */}
                    {upcomingEvents.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Upcoming Events ({upcomingEvents.length})
                        </h3>
                        <div className="space-y-4">
                          {upcomingEvents.map((event) => (
                            <div
                              key={event.id}
                              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex space-x-4">
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                                      {event.title}
                                    </h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        <span>{event.location}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>{event.currentGuests}/{event.maxGuests} guests</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Upcoming
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUnregister(event.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Past Events ({pastEvents.length})
                        </h3>
                        <div className="space-y-4">
                          {pastEvents.map((event) => (
                            <div
                              key={event.id}
                              className="border border-gray-200 rounded-xl p-6 opacity-75"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex space-x-4">
                                  <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-20 h-20 object-cover rounded-lg grayscale"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                                      {event.title}
                                    </h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        <span>{event.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge variant="secondary">
                                    Attended
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
