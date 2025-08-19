import { useState } from 'react'
import './App.css'
import ShyrianCodingSchool from './sheriyan/ShyrianCodingSchool'
import SheriyanCodingLandingPage from './sheriyan/SheriyanCodingLandingPage'
import TopBar from './components/layout/TopBar'
import LandingPageHeader from './components/layout/LandingPageHeader'
import HeroBanner from './components/layout/hero/HeroBanner'
import FeatureHighlights from './components/layout/FeatureHighlights'
import ProductSection from './components/layout/ProductSection'
import CardsGrid from './components/layout/CardsGrid'
import CaruselProductsDisplay from './components/layout/CarouseProductsDisplayl'
import Footer from './components/footer/Footer'
import Navbar from './components/navbarTopbar/Navbar'
import StatsSection from './components/statssection/StatsSection'
import OurTestimonial from './components/ourtestimonials/OurTesttimonial'
import BestsellerProductsSection from './components/bestsellerproducts/BestSellerProductsSection'
import PromoBanner from './components/promobanner/PromoBanner'
import BestsellerProductTwo from './components/bestsellerproducts/BestSellerProductTwo'

function App() {

  return (
    <>

      {/* <ShyrianCodingSchool />  */}
      {/* <SheriyanCodingLandingPage /> */}
      {/* <TopBar /> */}
      {/* <LandingPageHeader /> */}


       <Navbar />

      <HeroBanner />

      <FeatureHighlights /> 
      <ProductSection />
      <CardsGrid />
      <CaruselProductsDisplay />
      <PromoBanner />

      <BestsellerProductsSection />
      
      <BestsellerProductTwo />
      <StatsSection />
      <OurTestimonial />
      <Footer /> 


    </>
  )
}

export default App
