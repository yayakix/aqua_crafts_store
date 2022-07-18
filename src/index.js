import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './context/usercontex';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from './context/productcontext';
import { CartProvider } from './context/cartcontext';

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from './stripe/stripe';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
