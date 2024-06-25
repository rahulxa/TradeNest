import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landingPage/home/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./landingPage/signup/Signup"
import AboutPage from "./landingPage/about/AboutPage"
import ProductPage from "./landingPage/product/ProductPage"
import Pricing from './landingPage/home/Pricing';
import SupportPage from "./landingPage/support/SupportPage"
import Navbar from './landingPage/Navbar';
import Footer from './landingPage/Footer';
import NotFound from './landingPage/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='signup' element={<Signup />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='products' element={<ProductPage />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='support' element={<SupportPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);


