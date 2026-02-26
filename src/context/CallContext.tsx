import React, { createContext, useContext, useState, useEffect } from 'react';


interface CallContextType {
    status: 'IDLE' | 'RINGING' | 'CONNECTED' | 'DISCONNECTED';
    phoneNumber: string;
    transcript: string[];
    aiInsights: { sentiment: string; keywords: string[] };
    startCall: (num: string) => void;
    endCall: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [status, setStatus] = useState<'IDLE' | 'RINGING' | 'CONNECTED' | 'DISCONNECTED'>('IDLE');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [transcript, setTranscript] = useState<string[]>([]);
    const [aiInsights, setAiInsights] = useState({ sentiment: 'Neutral', keywords: [] as string[] });

    const startCall = (num: string) => {
        setPhoneNumber(num);
        setStatus('RINGING');
        setTimeout(() => setStatus('CONNECTED'), 2000); // 2s बाद कनेक्ट
    };


    const endCall = () => {
        setStatus('DISCONNECTED');
        setTimeout(() => {
            setStatus('IDLE');
            setTranscript([]);
        }, 2000);
    };


    useEffect(() => {
        let interval: any;
        if (status === 'CONNECTED') {
            interval = setInterval(() => {
                const mockLines = ["Hello, I need help.", "My order is delayed.", "I am very happy with the service."];
                const randomLine = mockLines[Math.floor(Math.random() * mockLines.length)];
                setTranscript(prev => [...prev, randomLine]);


                setAiInsights({
                    sentiment: randomLine.includes('happy') ? 'Positive' : randomLine.includes('delayed') ? 'Negative' : 'Neutral',
                    keywords: ['Order', 'Support', 'Billing']
                });
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [status]);

    return (
        <CallContext.Provider value={{ status, phoneNumber, transcript, aiInsights, startCall, endCall }}>
            {children}
        </CallContext.Provider>
    );
};

export const useCall = () => {
    const context = useContext(CallContext);
    if (!context) throw new Error("useCall must be used within CallProvider");
    return context;
};
