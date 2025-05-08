import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Suppress console errors from Three.js that might appear
const originalConsoleError = console.error;
console.error = function(msg) {
  if (msg && msg.includes && (
    msg.includes('THREE.WebGLRenderer:') ||
    msg.includes('Failed to execute \'texImage2D\'') ||
    msg.includes('Invalid value used as weak map key') ||
    msg.includes('GL.createTexture: textures with')
  )) {
    return;
  }
  originalConsoleError.apply(console, arguments);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Removing StrictMode to avoid double-rendering in development, which can cause issues with Three.js
  <App />
);

reportWebVitals();
