import React, { useEffect, useRef, useState } from 'react';

const TranscriptPanel = ({ isActive }: { isActive: boolean }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setMessages(prev => [...prev, "Simulated transcript line..."]);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isActive]);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [messages]);

    return (
        <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 border rounded bg-white">
            {messages.length === 0 && <p className="text-gray-400">Waiting for call...</p>}
            {messages.map((msg, i) => (
                <div key={i} className="mb-2 p-2 bg-blue-50 rounded">{msg}</div>
            ))}
        </div>
    );
};
