/**
 * Application entry point.
 * Initializes React app with StrictMode and global styles.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/globals.css';
import './styles/animations.css';
import './styles/scrollbar.css';
import './styles/typography.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
