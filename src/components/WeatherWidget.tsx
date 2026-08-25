import React from 'react';
import { Sun, Thermometer, Waves, Sparkles } from 'lucide-react';

interface WeatherWidgetProps {
  compact?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-300 border border-slate-700/60 shadow-md">
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
        <span className="font-semibold text-white">29°C</span>
        <span className="text-gray-400 hidden sm:inline">Kerr Serign</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl text-white max-w-md w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
            <Sun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Coastal Weather <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h4>
            <p className="text-xs text-gray-400">Kerr Serign & Senegambia</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-amber-400 flex items-center justify-end gap-1">
            29°C <span className="text-xs font-normal text-gray-300">(84°F)</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
            ☀️ Sunny & Clear
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
          <Waves className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-gray-400 text-[10px]">Atlantic Water</div>
            <div className="font-semibold text-white">26°C Warm</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
          <Thermometer className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-gray-400 text-[10px]">Best Travel</div>
            <div className="font-semibold text-white">Nov – May (Peak)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
