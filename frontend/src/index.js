import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landingPage/home/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./landingPage/signup/Signup"
import AboutPage from "./landingPage/about/AboutPage"
import ProductPage from "./landingPage/product/ProductPage"
import PricingPage from './landingPage/pricing/PricingPage';
import SupportPage from "./landingPage/support/SupportPage"
import Navbar from './landingPage/Navbar';
import Footer from './landingPage/Footer';
import NotFound from './landingPage/NotFound';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='signup' element={<Signup />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='products' element={<ProductPage />} />
        <Route path='pricing' element={<PricingPage />} />
        <Route path='support' element={<SupportPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>
);


