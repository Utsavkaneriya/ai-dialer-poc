import React from 'react';
import { useDialer } from '../hooks/useDialer';

const DialPad: React.FC = () => {
    const { phoneNumber, setPhoneNumber, status, handleMakeCall, handleHangUp } = useDialer();

    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

    const handleNumberClick = (num: string) => {
        if (status === 'IDLE') {
            setPhoneNumber(prev => prev + num);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Display Screen */}
            <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200 text-right">
                <span className="text-2xl font-mono block h-8 overflow-hidden">
                    {phoneNumber || "000-000-0000"}
                </span>
                <span className={`text-xs font-bold uppercase ${status === 'CONNECTED' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                    Status: {status}    
                </span>
            </div>

            {/* Number Grid */}
            <div className="grid grid-cols-3 gap-3">
                {buttons.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        disabled={status !== 'IDLE'}
                        className="h-14 w-full flex items-center justify-center bg-white border border-gray-300 rounded-xl text-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {num}
                    </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-2">
                {status === 'IDLE' ? (
                    <button
                        onClick={handleMakeCall}
                        disabled={!phoneNumber}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-300 transition-colors"
                    >
                        START CALL
                    </button>
                ) : (
                    <button
                        onClick={handleHangUp}
                        className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 animate-pulse transition-colors"
                    >
                        END CALL
                    </button>
                )}
            </div>
        </div>
    );
};

export default DialPad;
