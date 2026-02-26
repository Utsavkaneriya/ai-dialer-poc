import React, { useEffect, useRef, useState } from 'react';

const MOCK_MESSAGES = [
    "Hello, I need help with my billing.",
    "Can you verify my account number 5566?",
    "I am a bit frustrated with the recent charges.",
    "Thank you, that clears up my confusion!"
];

const Transcript: React.FC<{ status: string }> = ({ status }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: any;
        if (status === 'CONNECTED') {
            let index = 0;
            interval = setInterval(() => {
                if (index < MOCK_MESSAGES.length) {
                    setMessages(prev => [...prev, MOCK_MESSAGES[index]]);
                    index++;
                }
            }, 3000);
        } else if (status === 'IDLE' || status === 'DISCONNECTED') {
            setMessages([]);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Auto-scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-inner border border-gray-200">
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-3">
                {messages.length === 0 && (
                    <p className="text-gray-400 text-center mt-10 italic">
                        {status === 'RINGING' ? "Connecting..." : "Waiting for call to start..."}
                    </p>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-sm text-gray-700 animate-fade-in">
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transcript;
