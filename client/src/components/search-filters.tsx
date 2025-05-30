import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FilterOptions } from "@/types";

interface SearchFiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

export function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    location: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleInputChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {
      search: "",
      location: "",
      dateFrom: "",
      dateTo: "",
    };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  return (
    <section className="py-16 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Wedding Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search and filter through our curated collection of destination weddings
          </p>
        </div>

        <Card className="bg-white shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                    Search Weddings
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by couple, location..."
                      value={filters.search}
                      onChange={(e) => handleInputChange("search", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
                    <Select value={filters.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="All Destinations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Destinations</SelectItem>
                        <SelectItem value="italy">Italy</SelectItem>
                        <SelectItem value="greece">Greece</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="indonesia">Indonesia</SelectItem>
                        <SelectItem value="mexico">Mexico</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="thailand">Thailand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date From */}
                <div className="space-y-2">
                  <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
                    From Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="dateFrom"
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Date To */}
                <div className="space-y-2">
                  <Label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
                    To Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="dateTo"
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => handleInputChange("dateTo", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Weddings
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="px-8 py-3"
                >
                  Clear Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
