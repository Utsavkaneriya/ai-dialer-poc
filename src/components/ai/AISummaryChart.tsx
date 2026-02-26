import React from 'react';

export const AISummaryChart = () => {
    return (
        <div className="mt-8 pt-8 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span>📊</span> AI Summary
            </h4>

            <div className="flex items-center justify-between gap-4">
                {/* Simple CSS Donut Chart */}
                <div className="relative h-24 w-24 flex items-center justify-center">
                    <svg className="h-full w-full rotate-[-90deg]">
                        <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                        <circle cx="48" cy="48" r="40" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="75" strokeLinecap="round" />
                        <circle cx="48" cy="48" r="40" stroke="#3b82f6" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="180" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-black text-slate-700">70%</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase">Pos</span>
                    </div>
                </div>

                <div className="flex-grow space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span><span className="text-[10px] font-bold text-slate-500 uppercase">Positive</span></div>
                        <span className="text-xs font-black text-slate-700">70%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500"></span><span className="text-[10px] font-bold text-slate-500 uppercase">Neutral</span></div>
                        <span className="text-xs font-black text-slate-700">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-400"></span><span className="text-[10px] font-bold text-slate-500 uppercase">Negative</span></div>
                        <span className="text-xs font-black text-slate-700">10%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
