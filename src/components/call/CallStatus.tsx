import React from 'react';
import { useCall } from '../../context/CallContext';

export const CallStatus = () => {
  const { status, phoneNumber } = useCall();

  const getStatusColor = () => {
    switch (status) {
      case 'CONNECTED': return '#28a745';
      case 'RINGING': return '#ffc107';
      case 'DISCONNECTED': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%', background: getStatusColor(),
        margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold'
      }}>
        {status}
      </div>
      <h4 style={{ margin: '5px 0' }}>{phoneNumber || "No Active Call"}</h4>
      <p style={{ color: '#666', fontSize: '12px' }}>
        {status === 'CONNECTED' ? "Call in progress..." : "Ready to dial"}
      </p>
    </div>
  );
};
