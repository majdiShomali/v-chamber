import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProvider from './context/userContext';
import CartProvider from './context/cartContext';

import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <UserProvider>
        <CartProvider>
          <Provider store={store}>
          <PayPalScriptProvider 
          
          options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
          
          >
              <App />
              </PayPalScriptProvider>
          </Provider>
        </CartProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
