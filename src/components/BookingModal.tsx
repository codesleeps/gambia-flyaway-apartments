import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, MapPin, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  max_guests: number;
}

interface BookingModalProps {
  apartment: Apartment | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ apartment, isOpen, onClose }) => {
  const { user } = useAuth();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const cleaningFee = 25;
  const serviceFee = 15;

  const getNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diff = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const calculateSubtotal = () => {
    if (!apartment) return 0;
    return getNights() * apartment.price;
  };

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 0 ? subtotal + cleaningFee + serviceFee : 0;
  };

  const setPresetDates = (days: number) => {
    const start = new Date();
    const end = addDays(start, days);
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  const handleBooking = async () => {
    if (!user || !apartment || !checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      return;
    }

    if (guests > apartment.max_guests) {
      toast.error(`Maximum ${apartment.max_guests} guests allowed`);
      return;
    }

    if (getNights() <= 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    setIsBooking(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          apartment_id: apartment.id,
          check_in_date: format(checkInDate, 'yyyy-MM-dd'),
          check_out_date: format(checkOutDate, 'yyyy-MM-dd'),
          guests,
          total_price: calculateTotalPrice(),
          special_requests: specialRequests || null,
        });

      if (error) throw error;

      toast.success("Reservation Confirmed! 🎉", {
        description: `Your stay at ${apartment.name} has been booked. See your dashboard for details.`,
      });

      onClose();
      // Reset form
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
      setGuests(1);
      setSpecialRequests('');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Booking Failed", {
        description: "Could not create reservation. Please try again or check connection.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (!apartment) return null;

  const nights = getNights();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px] p-6 rounded-2xl bg-white border border-gray-100 shadow-2xl">
        <DialogHeader className="pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Direct Reservation
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
            <span>{apartment.name}</span>
            <span className="text-primary text-lg">${apartment.price}<span className="text-xs text-muted-foreground font-normal">/night</span></span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary inline" /> {apartment.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3 text-sm">
          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground font-medium">Quick Dates:</span>
            <button
              type="button"
              onClick={() => setPresetDates(3)}
              className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium transition-colors"
            >
              3 Nights
            </button>
            <button
              type="button"
              onClick={() => setPresetDates(7)}
              className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 font-medium transition-colors"
            >
              1 Week
            </button>
          </div>

          {/* Dates Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-1 block">Check-in Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal text-xs h-10 border-gray-200",
                      !checkInDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5 text-primary" />
                    {checkInDate ? format(checkInDate, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white shadow-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700 mb-1 block">Check-out Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal text-xs h-10 border-gray-200",
                      !checkOutDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3.5 w-3.5 text-primary" />
                    {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white shadow-xl" align="end">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date <= (checkInDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="guests" className="text-xs font-semibold text-gray-700">Number of Guests</Label>
              <span className="text-[11px] text-muted-foreground">Max {apartment.max_guests} guests</span>
            </div>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                id="guests"
                type="number"
                min="1"
                max={apartment.max_guests}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="pl-9 h-10 border-gray-200 text-xs"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="requests" className="text-xs font-semibold text-gray-700 mb-1 block">
              Special Requests (Optional)
            </Label>
            <Textarea
              id="requests"
              placeholder="Airport pickup, early check-in, extra towels..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="h-16 text-xs border-gray-200 resize-none"
            />
          </div>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>${apartment.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                <span className="font-semibold text-gray-900">${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Cleaning & Sanitization fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Resort & Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold text-sm text-gray-900">
                <span>Total Due:</span>
                <span className="text-primary text-lg">${calculateTotalPrice()}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Free cancellation up to 48 hours before check-in date.</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1 text-xs">
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={!checkInDate || !checkOutDate || nights <= 0 || isBooking}
            className="flex-1 booking-gradient text-white text-xs font-semibold shadow-md"
          >
            {isBooking ? "Confirming..." : "Confirm & Reserve"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
