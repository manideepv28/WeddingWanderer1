import { useState } from "react";
import { SearchFilters } from "@/components/search-filters";
import { EventCard } from "@/components/event-card";
import { useEvents } from "@/hooks/use-events";
import { useAuth } from "@/hooks/use-auth";
import { FilterOptions } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsProps {
  onAuthRequired: () => void;
}

export function Events({ onAuthRequired }: EventsProps) {
  const { filteredEvents, isLoading, applyFilters, isUserRegistered } = useEvents();
  const { user } = useAuth();
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  const handleApplyFilters = (filters: FilterOptions) => {
    applyFilters(filters);
    setHasAppliedFilters(true);
  };

  if (isLoading) {
    return (
      <div>
        <SearchFilters onApplyFilters={handleApplyFilters} />
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-96 mx-auto mb-4" />
              <Skeleton className="h-6 w-[600px] mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <SearchFilters onApplyFilters={handleApplyFilters} />
      
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-rose-600">Destination Weddings</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join these magical celebrations in the world's most romantic destinations
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💒</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {hasAppliedFilters ? "No weddings found" : "No weddings available"}
              </h3>
              <p className="text-gray-600 mb-8">
                {hasAppliedFilters 
                  ? "Try adjusting your search criteria to find more weddings." 
                  : "Check back soon for amazing destination wedding opportunities!"
                }
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRegistered={user ? isUserRegistered(user.id, event.id) : false}
                    onAuthRequired={onAuthRequired}
                  />
                ))}
              </div>

              {filteredEvents.length > 0 && (
                <div className="text-center mt-12">
                  <p className="text-gray-600 mb-4">
                    Showing {filteredEvents.length} wedding{filteredEvents.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
