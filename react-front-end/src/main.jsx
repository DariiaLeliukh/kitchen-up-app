import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './styles/css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import ScrollToTop from "./helpers/ScrollToTop";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ScrollToTop />
      <App />
    </AuthProvider>
  </BrowserRouter>
);
