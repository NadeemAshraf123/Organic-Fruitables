import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ShyrianCodingSchool from "./sheriyan/ShyrianCodingSchool";
import SheriyanCodingLandingPage from "./sheriyan/SheriyanCodingLandingPage";
import TopBar from "./components/layout/TopBar";
import LandingPageHeader from "./components/layout/LandingPageHeader";
import HeroBanner from "./components/layout/hero/HeroBanner";
import FeatureHighlights from "./components/layout/FeatureHighlights";
import ProductSection from "./components/layout/ProductSection";
import CardsGrid from "./components/layout/CardsGrid";
import CaruselProductsDisplay from "./components/layout/CarouseProductsDisplayl";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbarTopbar/Navbar";
import StatsSection from "./components/statssection/StatsSection";
import OurTestimonial from "./components/ourtestimonials/OurTesttimonial";
import BestsellerProductsSection from "./components/bestsellerproducts/BestSellerProductsSection";
import PromoBanner from "./components/promobanner/PromoBanner";
import BestsellerProductTwo from "./components/bestsellerproducts/BestSellerProductTwo";
import AddProductCategory from "./pages/AddProductCategory";
import AddProductPage from "./pages/AddProductPage";


function App() {
  return (
    <>
      {/* <ShyrianCodingSchool />  */}
      {/* <SheriyanCodingLandingPage /> */}
      {/* <TopBar /> */}
      {/* <LandingPageHeader /> */}
      <Router>

      <Navbar />
      
        <Routes>
          <Route
            path="/"
            element={
              <>
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
            }
          />
          <Route path="/add-product" element={ <AddProductPage /> }  />

          <Route path="/add-category" element={ <AddProductCategory /> }  />

        </Routes>
      </Router>
    </>
  );
}

export default App;
