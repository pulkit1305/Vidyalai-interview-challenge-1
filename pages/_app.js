import React from 'react';
import { WindowWidthProvider } from '../context/WindowWidthContext'; // Adjust path as needed

function MyApp({ Component, pageProps }) {
  return (
    <WindowWidthProvider>
      <Component {...pageProps} />
    </WindowWidthProvider>
  );
}

export default MyApp;
