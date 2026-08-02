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
    <div className="w-full bg-slate-800/95 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-6 mb-8 border border-slate-700/80 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            type="text"
            placeholder="Search apartment name..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="pl-9 bg-slate-900/90 border-slate-700 text-white placeholder:text-gray-400 focus:bg-slate-900 text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <Select
            value={filters.location}
            onValueChange={(val) => onFilterChange({ location: val })}
          >
            <SelectTrigger className="w-full bg-slate-900/90 border-slate-700 text-white text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc} className="hover:bg-slate-800 focus:bg-slate-800 text-white">
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
            <SelectTrigger className="w-full bg-slate-900/90 border-slate-700 text-white text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
              <div className="flex items-center gap-2 truncate">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                <SelectValue placeholder="Price Range" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="all" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Any Price</SelectItem>
              <SelectItem value="under-100" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Under $100 / night</SelectItem>
              <SelectItem value="100-200" className="hover:bg-slate-800 focus:bg-slate-800 text-white">$100 - $200 / night</SelectItem>
              <SelectItem value="over-200" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Over $200 / night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <Select
            value={filters.bedrooms}
            onValueChange={(val) => onFilterChange({ bedrooms: val })}
          >
            <SelectTrigger className="w-full bg-slate-900/90 border-slate-700 text-white text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
              <div className="flex items-center gap-2 truncate">
                <Bed className="w-4 h-4 text-cyan-400 shrink-0" />
                <SelectValue placeholder="Bedrooms" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="all" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Any Bedrooms</SelectItem>
              <SelectItem value="1" className="hover:bg-slate-800 focus:bg-slate-800 text-white">1+ Bedroom</SelectItem>
              <SelectItem value="2" className="hover:bg-slate-800 focus:bg-slate-800 text-white">2+ Bedrooms</SelectItem>
              <SelectItem value="3" className="hover:bg-slate-800 focus:bg-slate-800 text-white">3+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <Select
            value={filters.sortBy}
            onValueChange={(val) => onFilterChange({ sortBy: val })}
          >
            <SelectTrigger className="w-full bg-slate-900/90 border-slate-700 text-white text-sm font-medium focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-4 h-4 text-amber-400 shrink-0" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="recommended" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Recommended</SelectItem>
              <SelectItem value="price-asc" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc" className="hover:bg-slate-800 focus:bg-slate-800 text-white">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Status & Reset */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-300 pt-3 border-t border-slate-700/60">
        <div>
          Showing <span className="font-bold text-orange-400">{totalResults}</span> {totalResults === 1 ? 'apartment' : 'apartments'}
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
            className="text-xs text-orange-400 hover:text-orange-300 hover:bg-slate-700/50 h-7 px-2 font-medium"
          >
            <RotateCcw className="w-3 h-3 mr-1" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
