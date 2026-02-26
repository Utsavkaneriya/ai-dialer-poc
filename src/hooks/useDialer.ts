import { useState, useEffect, useCallback } from 'react';
import { twilioService, CallStatus } from '../services/twilioService';

export const useDialer = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState<CallStatus>('IDLE');
    const [isTokenValid, setIsTokenValid] = useState(true);


    const handleMakeCall = useCallback(() => {
        if (!phoneNumber || !isTokenValid) return;
        twilioService.makeCall(phoneNumber);
    }, [phoneNumber, isTokenValid]);


    const handleHangUp = useCallback(() => {
        twilioService.hangUp();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTokenValid(false);
            console.warn("Token Expired!");
        }, 120000);

        return () => clearTimeout(timer);
    }, [isTokenValid]);


    useEffect(() => {
        twilioService.on('status', (newStatus: CallStatus) => {
            setStatus(newStatus);
        });
    }, []);

    return {
        phoneNumber,
        setPhoneNumber,
        status,
        isTokenValid,
        setIsTokenValid,
        handleMakeCall,
        handleHangUp
    };
};
