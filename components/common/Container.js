import React from 'react';
import { useWindowWidth } from '../../context/WindowWidthContext'; // Adjust path as needed

export default function Container({ children }) {
  const { isSmallerDevice } = useWindowWidth();
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}
