
export type CallStatus = 'IDLE' | 'RINGING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR';

class MockTwilioService {
    private listeners: Record<string, Function[]> = {};

    on(event: string, callback: Function) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    private emit(event: string, data?: any) {
        this.listeners[event]?.forEach(cb => cb(data));
    }

    async makeCall(phoneNumber: string) {
        this.emit('status', 'RINGING');


        setTimeout(() => {
            this.emit('status', 'CONNECTED');
            this.startSimulatedTranscript();
        }, 2000);
    }

    hangUp() {
        this.emit('status', 'DISCONNECTED');

        setTimeout(() => this.emit('status', 'IDLE'), 1000);
    }

    private startSimulatedTranscript() {

    }
}

export const twilioService = new MockTwilioService();
