import { useState } from 'react'
import './App.css'
import TopBar from './components/layout/TopBar'
import LandingPageHeader from './components/layout/LandingPageHeader'
import HeroBanner from './components/layout/hero/HeroBanner'
import FeatureHighlights from './components/layout/FeatureHighlights'
import ProductSection from './components/layout/ProductSection'
import CardsGrid from './components/layout/CardsGrid'
import CaruselProductsDisplay from './components/layout/CarouseProductsDisplayl'
import Footer from './components/footer/Footer'

function App() {

  return (
    <>
      
      <TopBar />
      <LandingPageHeader />
      <HeroBanner /> 
      <FeatureHighlights /> 
      <ProductSection />
      <CardsGrid />
      <CaruselProductsDisplay />
      <Footer />
    </>
  )
}

export default App
