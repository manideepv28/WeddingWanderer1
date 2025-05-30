import { useState, useEffect, useCallback } from 'react';
import { WeddingEvent, Registration } from '@shared/schema';
import LocalStorage from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { FilterOptions } from '@/types';

export function useEvents() {
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<WeddingEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load events and registrations
  useEffect(() => {
    setIsLoading(true);
    const loadedEvents = LocalStorage.getEvents();
    const loadedRegistrations = LocalStorage.getRegistrations();
    
    setEvents(loadedEvents);
    setFilteredEvents(loadedEvents);
    setRegistrations(loadedRegistrations);
    setIsLoading(false);
  }, []);

  const applyFilters = useCallback((filters: FilterOptions) => {
    let filtered = [...events];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.coupleName.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(event => 
        event.country === filters.location.toLowerCase() ||
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(event => 
        new Date(event.date) >= new Date(filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(event => 
        new Date(event.date) <= new Date(filters.dateTo!)
      );
    }

    setFilteredEvents(filtered);
  }, [events]);

  const registerForEvent = useCallback(async (eventId: string, userId: string): Promise<boolean> => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        toast({
          title: "Event not found",
          description: "The selected event could not be found",
          variant: "destructive",
        });
        return false;
      }

      // Check if already registered
      const existingRegistration = LocalStorage.getEventRegistration(userId, eventId);
      if (existingRegistration && existingRegistration.status === 'registered') {
        toast({
          title: "Already registered",
          description: "You are already registered for this event",
          variant: "destructive",
        });
        return false;
      }

      // Check capacity
      if (event.currentGuests >= event.maxGuests) {
        toast({
          title: "Event full",
          description: "This event has reached its maximum capacity",
          variant: "destructive",
        });
        return false;
      }

      // Create registration
      const newRegistration: Registration = {
        id: Date.now().toString(),
        userId,
        eventId,
        status: 'registered',
        registeredAt: new Date().toISOString(),
      };

      LocalStorage.saveRegistration(newRegistration);

      // Update event guest count
      const updatedEvent = { ...event, currentGuests: event.currentGuests + 1 };
      LocalStorage.updateEvent(updatedEvent);

      // Update state
      setEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      setFilteredEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      setRegistrations(prev => [...prev, newRegistration]);

      toast({
        title: "Registration successful!",
        description: `You're now registered for ${event.title}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  }, [events, toast]);

  const unregisterFromEvent = useCallback(async (eventId: string, userId: string): Promise<boolean> => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) {
        toast({
          title: "Event not found",
          description: "The selected event could not be found",
          variant: "destructive",
        });
        return false;
      }

      LocalStorage.removeRegistration(userId, eventId);

      // Update event guest count
      const updatedEvent = { ...event, currentGuests: Math.max(0, event.currentGuests - 1) };
      LocalStorage.updateEvent(updatedEvent);

      // Update state
      setEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      setFilteredEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      setRegistrations(prev => prev.map(r => 
        r.userId === userId && r.eventId === eventId 
          ? { ...r, status: 'cancelled' as const } 
          : r
      ));

      toast({
        title: "Unregistered",
        description: `You have been unregistered from ${event.title}`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Unregistration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  }, [events, toast]);

  const getUserRegistrations = useCallback((userId: string) => {
    return LocalStorage.getUserRegistrations(userId);
  }, []);

  const isUserRegistered = useCallback((userId: string, eventId: string): boolean => {
    const registration = LocalStorage.getEventRegistration(userId, eventId);
    return registration?.status === 'registered';
  }, []);

  return {
    events,
    filteredEvents,
    registrations,
    isLoading,
    applyFilters,
    registerForEvent,
    unregisterFromEvent,
    getUserRegistrations,
    isUserRegistered,
  };
}
