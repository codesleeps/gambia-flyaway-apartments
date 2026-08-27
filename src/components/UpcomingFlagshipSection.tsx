import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Utensils, Waves, Flame, Building2, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { getImagePath } from "@/utils/imageUtils";
import { toast } from "sonner";

export const UpcomingFlagshipSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("Thank you! You've been added to our priority preview list for the new flagship complex.");
  };

  return (
    <section id="flagship-preview" className="py-20 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 px-4 py-1.5 mb-4 text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400 inline" />
            Sneak Peek • Target Completion Late 2026
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white leading-tight">
            Our Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Flagship Luxury Complex</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            An ambitious architectural marvel combining luxury self-catering suites, an authentic on-site Gambian restaurant, billiards lounge, private sauna, and central courtyard swimming pool.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Main Visual Image Column (7 cols) */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950">
              <img
                src={getImagePath('images/upcoming/flagship-restaurant-apartments.jpg')}
                alt="Upcoming Flagship Luxury Apartment and Restaurant Building render"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/images/upcoming/flagship-restaurant-apartments.jpg';
                }}
              />
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            
            {/* Corner Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-slate-950/85 text-amber-400 border border-amber-400/30 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> Architectural Preview
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-4 bg-slate-950/80 border border-slate-800/80 rounded-xl backdrop-blur-md">
              <p className="text-white text-xs sm:text-sm font-bold flex items-center justify-between">
                <span>Multi-Level Boutique Tower & Pool Villa</span>
                <span className="text-orange-400 font-semibold text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 inline" /> Expected Late 2026
                </span>
              </p>
            </div>
          </div>

          {/* Highlights & Information Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Luxury Living Meets Culinary Excellence
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Designed to be the ultimate retreat in Kerr Serign, featuring state-of-the-art construction, eco-friendly materials, and premium guest amenities.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fresh Local Gambian Restaurant</h4>
                  <p className="text-xs text-slate-300">Ground floor gourmet dining featuring fresh seafood, local spices & outdoor terrace.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Billiards Lounge & Sauna Suite</h4>
                  <p className="text-xs text-slate-300">Upper levels featuring open-air games room, lounge area, and timber sauna.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Private Courtyard & Pool</h4>
                  <p className="text-xs text-slate-300">Secluded swimming pool surrounded by tropical vegetation and stone balconies.</p>
                </div>
              </div>
            </div>

            {/* Priority Waitlist / Notification Box */}
            <div className="pt-2 border-t border-slate-800">
              {subscribed ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-xl text-emerald-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>You're on the priority notification list! We'll update you as construction progresses.</span>
                </div>
              ) : (
                <form onSubmit={handleNotifyMe} className="space-y-2">
                  <p className="text-xs font-semibold text-slate-300">Be first to know when reservations open:</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-400 flex-1"
                    />
                    <Button type="submit" size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl px-4 shadow-lg shrink-0">
                      Notify Me <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFlagshipSection;
