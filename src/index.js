import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
