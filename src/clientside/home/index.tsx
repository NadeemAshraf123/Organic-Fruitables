import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import HeroBanner from '../../clientside/heroslider/index';
import FeatureHighlights from '../featuresHighlight';
import OurOrganicProducts from '../ourorganicproducts';
import CardsGrid from '../cardgrid';
import FreshOrganicVegatables from '../freshorganicegatables';
import PromoBanner from '../promobanner';
import BestSellerProductCard from '../bestsellerproducts/BestSellerProductCard';
import BestsellerProductsSection from '../bestsellerproducts';
import BestsellerProductTwo from '../bestsellerproduct';
import StatsSection from '../statssection';
import OurTestimonial from '../ourtestimonials/index';
import Footer from '../../components/commoncomponent/footer';





const Home  = () => {



  return (
    <>
    <HeroBanner />
    <FeatureHighlights />
    <OurOrganicProducts />
    <CardsGrid />
    <FreshOrganicVegatables />
    <PromoBanner />
    <BestsellerProductsSection />
    <BestsellerProductTwo />
    <StatsSection />
    <OurTestimonial />
    <Footer />
    </>
  )
}


export default Home 