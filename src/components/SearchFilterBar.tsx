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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 z-10" />
          <Input
            type="text"
            placeholder="Search apartment name..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="pl-9 bg-white text-slate-900 placeholder:text-gray-500 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-sm shadow-sm"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <Select
            value={filters.location}
            onValueChange={(val) => onFilterChange({ location: val })}
          >
            <SelectTrigger className="w-full bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-sm shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 border-2 border-slate-300 shadow-2xl z-50">
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc} className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">
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
            <SelectTrigger className="w-full bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-sm shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                <SelectValue placeholder="Price Range" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 border-2 border-slate-300 shadow-2xl z-50">
              <SelectItem value="all" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Any Price</SelectItem>
              <SelectItem value="under-100" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Under $100 / night</SelectItem>
              <SelectItem value="100-200" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">$100 - $200 / night</SelectItem>
              <SelectItem value="over-200" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Over $200 / night</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <Select
            value={filters.bedrooms}
            onValueChange={(val) => onFilterChange({ bedrooms: val })}
          >
            <SelectTrigger className="w-full bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-sm shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <Bed className="w-4 h-4 text-blue-600 shrink-0" />
                <SelectValue placeholder="Bedrooms" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 border-2 border-slate-300 shadow-2xl z-50">
              <SelectItem value="all" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Any Bedrooms</SelectItem>
              <SelectItem value="1" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">1+ Bedroom</SelectItem>
              <SelectItem value="2" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">2+ Bedrooms</SelectItem>
              <SelectItem value="3" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">3+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="relative">
          <Select
            value={filters.sortBy}
            onValueChange={(val) => onFilterChange({ sortBy: val })}
          >
            <SelectTrigger className="w-full bg-white text-slate-900 font-bold border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-sm shadow-sm">
              <div className="flex items-center gap-2 truncate">
                <SlidersHorizontal className="w-4 h-4 text-purple-600 shrink-0" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white text-slate-900 border-2 border-slate-300 shadow-2xl z-50">
              <SelectItem value="recommended" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Recommended</SelectItem>
              <SelectItem value="price-asc" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Price: Low to High</SelectItem>
              <SelectItem value="price-desc" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc" className="hover:bg-orange-50 focus:bg-orange-50 text-slate-900 font-semibold cursor-pointer">Highest Rated</SelectItem>
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
