import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context with default values
const WindowWidthContext = createContext({
  isSmallerDevice: false,
});

// Provider component
export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if window is defined
      const handleResize = () => {
        setIsSmallerDevice(window.innerWidth < 500);
      };

      handleResize(); // Initialize state
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

// Custom hook to use the context
export const useWindowWidth = () => useContext(WindowWidthContext);
