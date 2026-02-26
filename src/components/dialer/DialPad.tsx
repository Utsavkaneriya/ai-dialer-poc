import React, { useState } from 'react';
import { useCall } from '../../context/CallContext';

export const DialPad = () => {
    const [input, setInput] = useState('');
    const { startCall, status, endCall } = useCall();

    const handleNumClick = (num: string) => {
        if (status === 'IDLE') setInput(prev => prev + num);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Display */}
            <div style={{
                background: '#f8f9fa', padding: '15px', borderRadius: '8px',
                fontSize: '24px', textAlign: 'right', border: '1px solid #ddd', height: '40px'
            }}>
                {input || "000-000"}
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(n => (
                    <button
                        key={n}
                        onClick={() => handleNumClick(n)}
                        style={{ padding: '15px', borderRadius: '8px', border: '1px solid #ccc', cursor: 'pointer' }}
                    >
                        {n}
                    </button>
                ))}
            </div>

            {/* Action Button */}
            {status === 'IDLE' ? (
                <button
                    onClick={() => startCall(input)}
                    disabled={!input}
                    style={{ padding: '15px', background: '#28a745', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                    CALL
                </button>
            ) : (
                <button
                    onClick={endCall}
                    style={{ padding: '15px', background: '#dc3545', color: 'white', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                    HANG UP
                </button>
            )}
        </div>
    );
};
