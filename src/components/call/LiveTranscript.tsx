import React, { useEffect, useRef } from 'react';
import { useCall } from '../../context/CallContext';

export const LiveTranscript = () => {
    const { transcript, status } = useCall();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [transcript]);

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-50">
                <h3 className="text-slate-800 font-bold text-sm flex items-center gap-2 uppercase tracking-wide">
                    <span className="p-1 bg-blue-100 rounded text-blue-600">📝</span> Live Transcript
                </h3>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest">REAL-TIME FEED</span>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar" style={{ maxHeight: '300px' }}>
                {transcript.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2">
                        <span className="text-3xl animate-pulse">🛰️</span>
                        <p className="text-xs font-bold uppercase">{status === 'CONNECTED' ? 'Listening...' : 'Awaiting Connection'}</p>
                    </div>
                ) : (
                    transcript.map((msg, i) => {
                        const isAgent = i % 2 !== 0; // Alternating for demo
                        return (
                            <div key={i} className="flex flex-col gap-1 group">
                                <div className="flex justify-between items-center">
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${isAgent ? 'text-emerald-500' : 'text-blue-500'}`}>
                                        👤 {isAgent ? 'Agent' : 'Customer'}
                                    </span>
                                    <span className="text-[10px] text-slate-300">00:{i < 10 ? `0${i + 5}` : i + 5}</span>
                                </div>
                                <p className={`text-sm p-3 rounded-xl leading-relaxed ${isAgent ? 'bg-emerald-50 text-emerald-900 border-l-4 border-emerald-500' : 'bg-blue-50 text-blue-900 border-l-4 border-blue-500'}`}>
                                    {msg}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
