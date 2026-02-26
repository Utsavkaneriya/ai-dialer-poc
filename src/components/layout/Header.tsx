import React, { useState, useEffect, useRef } from 'react';
import { Phone, Bell, User, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
    const [tokenValid, setTokenValid] = useState<boolean>(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Function to start expiry timer
    const startTokenTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setTokenValid(false);
        }, 120000); // 2 minutes
    };

    // Start timer on first load
    useEffect(() => {
        startTokenTimer();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Refresh Token Button
    const handleRefresh = () => {
        setTokenValid(true);
        startTokenTimer(); // restart timer
    };

    return (
        <header
            style={{
                background: '#0f172a',
                color: 'white',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'sans-serif'
            }}
        >
            {/* Left Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#22c55e', padding: '6px', borderRadius: '8px' }}>
                        <Phone size={20} color="white" />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
                        AI-Powered Calling System
                    </h2>
                </div>

                <span
                    style={{
                        background: '#334155',
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        color: '#94a3b8'
                    }}
                >
                    Twilio POC
                </span>
            </div>

            {/* Right Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Token Status */}
                <div
                    style={{
                        background: '#1e293b',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #334155'
                    }}
                >
                    <span style={{ fontSize: '13px', color: '#94a3b8', marginRight: '6px' }}>
                        Token:
                    </span>
                    <span
                        style={{
                            fontSize: '13px',
                            color: tokenValid ? '#4ade80' : '#f87171',
                            fontWeight: 500
                        }}
                    >
                        {tokenValid ? 'Valid' : 'Expired'}
                    </span>
                </div>

                {/* Refresh Button */}
                <button
                    onClick={handleRefresh}
                    style={{
                        background: 'transparent',
                        color: 'white',
                        border: '1px solid #334155',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <RefreshCw size={14} />
                    Refresh Token
                </button>

                <Bell size={20} style={{ color: '#94a3b8', cursor: 'pointer' }} />

                <div
                    style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        background: '#334155',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <User size={18} />
                </div>
            </div>
        </header>
    );
};