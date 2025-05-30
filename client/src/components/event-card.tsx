import { useState } from "react";
import { Calendar, MapPin, Users, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WeddingEvent } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useEvents } from "@/hooks/use-events";
import { useNotifications } from "@/hooks/use-notifications";

interface EventCardProps {
  event: WeddingEvent;
  isRegistered?: boolean;
  onAuthRequired?: () => void;
}

export function EventCard({ event, isRegistered = false, onAuthRequired }: EventCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { registerForEvent, unregisterFromEvent } = useEvents();
  const { sendRegistrationConfirmation, scheduleEventReminder } = useNotifications();

  const handleRegistration = async () => {
    if (!isAuthenticated || !user) {
      onAuthRequired?.();
      return;
    }

    if (isRegistered) {
      await unregisterFromEvent(event.id, user.id);
    } else {
      const success = await registerForEvent(event.id, user.id);
      if (success) {
        sendRegistrationConfirmation(event);
        scheduleEventReminder(event);
      }
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

  const spotsLeft = event.maxGuests - event.currentGuests;
  const isFullyBooked = spotsLeft <= 0;

  return (
    <Card className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-rose-600">
            ${event.price}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white">
            {event.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="mr-2 h-4 w-4 text-rose-500" />
            <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="mr-2 h-4 w-4 text-rose-500" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="mr-2 h-4 w-4 text-rose-500" />
            <span>{event.currentGuests}/{event.maxGuests} guests</span>
          </div>
        </div>

        {spotsLeft <= 10 && spotsLeft > 0 && (
          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm font-medium">
              Only {spotsLeft} spots left!
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Info className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">{event.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Event Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-rose-500" />
                        <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-3 h-5 w-5 text-rose-500" />
                        <span>{event.venue}, {event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-3 h-5 w-5 text-rose-500" />
                        <span>{event.currentGuests}/{event.maxGuests} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="mr-3 h-5 w-5 text-rose-500" />
                        <span>${event.price} per person</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {event.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-rose-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">About This Wedding</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                  
                  <h4 className="font-semibold mb-2">About the Couple</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">{event.coupleStory}</p>
                  
                  <h4 className="font-semibold mb-2">Dress Code</h4>
                  <p className="text-gray-600">{event.dresscode}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                  <Button
                    onClick={handleRegistration}
                    disabled={isFullyBooked && !isRegistered}
                    className={`flex-1 ${
                      isRegistered
                        ? "bg-green-600 hover:bg-green-700"
                        : isFullyBooked
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-rose-500 hover:bg-rose-600"
                    } text-white`}
                  >
                    {isRegistered
                      ? "Unregister"
                      : isFullyBooked
                      ? "Fully Booked"
                      : "Register to Attend"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailsOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleRegistration}
            disabled={isFullyBooked && !isRegistered}
            className={`flex-1 ${
              isRegistered
                ? "bg-green-600 hover:bg-green-700"
                : isFullyBooked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
            } text-white`}
          >
            {isRegistered
              ? "Registered ✓"
              : isFullyBooked
              ? "Full"
              : "Register"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
