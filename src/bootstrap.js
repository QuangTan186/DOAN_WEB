
import App from './App';
import React from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (process.env.NODE_ENV !== 'production') {
    reportWebVitals(console.log)
}
