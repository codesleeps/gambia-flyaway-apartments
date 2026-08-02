import React from 'react';
import { Search, MapPin, DollarSign, Bed, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterState {
  location: string;
  priceRange: string;
  bedrooms: string;
  sortBy: string;
  searchQuery: string;
}

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const locations = ['All Locations', 'Serrekunda', 'Kololi', 'Banjul', 'Bakau', 'Fajara', 'Juffureh'];

  return (
    <div className="w-full bg-slate-800/90 backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-6 mb-8 border border-slate-700/60 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search apartment name..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="pl-9 bg-slate-900/80 border-slate-700 text-white placeholder:text-gray-400 focus:bg-slate-900 text-sm"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <Select
            value={filters.location}
            onValueChange={(val) => onFilterChange({ location: val })}
          >
            <SelectTrigger className="w-full bg-white/80 border-gray-200 text-sm">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <Select
            value={filters.priceRange}
            onValueChange={(val) => onFilterChange({ priceRange: val })}
          >
            <SelectTrigger className="w-full bg-white/80 border-gray-200 text-sm">
              <div className="flex items-center gap-2 truncate">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <SelectValue placeholder="Price Range" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="under-100">Under $100 / night</SelectItem>
              <SelectItem value="100-200">$100 - $200 / night</SelectItem>
              <SelectItem value="over-200">Over $200 / night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <Select
            value={filters.bedrooms}
            onValueChange={(val) => onFilterChange({ bedrooms: val })}
          >
            <SelectTrigger className="w-full bg-white/80 border-gray-200 text-sm">
              <div className="flex items-center gap-2 truncate">
                <Bed className="w-4 h-4 text-blue-500 shrink-0" />
                <SelectValue placeholder="Bedrooms" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Bedrooms</SelectItem>
              <SelectItem value="1">1+ Bedroom</SelectItem>
              <SelectItem value="2">2+ Bedrooms</SelectItem>
              <SelectItem value="3">3+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <Select
            value={filters.sortBy}
            onValueChange={(val) => onFilterChange({ sortBy: val })}
          >
            <SelectTrigger className="w-full bg-white/80 border-gray-200 text-sm">
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-4 h-4 text-purple-500 shrink-0" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Status & Reset */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground pt-2 border-t border-gray-100">
        <div>
          Showing <span className="font-semibold text-gray-900">{totalResults}</span> {totalResults === 1 ? 'apartment' : 'apartments'}
        </div>

        {(filters.location !== 'All Locations' ||
          filters.priceRange !== 'all' ||
          filters.bedrooms !== 'all' ||
          filters.searchQuery !== '' ||
          filters.sortBy !== 'recommended') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-primary hover:text-primary/80 h-7 px-2"
          >
            <RotateCcw className="w-3 h-3 mr-1" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
