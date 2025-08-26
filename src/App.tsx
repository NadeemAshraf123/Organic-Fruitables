import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import "./App.css";
// import DashboardShell from './components/mainLayout/MainDashboard'
import MainDashboard from "./components/mainLayout/MainDashboard";
import AuthenticatedUsers from "./components/productDashboard/adminSection/AuthenticatedUsers";
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
import AddProductCategory from "./components/pages/AddProductCategory";
import AddProductPage from "./components/pages/AddProductPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
// dashboard section?
import ProtectedRoute from "./components/protectroutes/ProtectedRoutes";
import AddDashboardCategory from "./components/dashboardpages/addDashboardCategory/AddDashboardCategory";
import AddDashboardProduct from "./components/dashboardpages/addDashboardProduct/AddDashboardProduct";



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  return (
    <>
      {/* <ShyrianCodingSchool />  */}
      {/* <SheriyanCodingLandingPage /> */}
      {/* <TopBar /> */}
      {/* <LandingPageHeader /> */}
      <Router>

      {/* <Navbar isAuthenticated = {isAuthenticated} onLogout = {() => setIsAuthenticated(false)}  /> */}

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
          <Route path="/add-product"  element={ <AddProductPage /> }  />
          <Route path="/add-category" element={ <AddProductCategory /> }  />
          <Route path="/login"    element={ <LoginPage setIsAuthenticated={setIsAuthenticated}/>  }   />
          <Route path="/signuppage"   element={ <SignUpPage />   } />


          {/* Dashboard Routes  -  Protected  */}

          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
            <Route path="/dashboard" element={ <MainDashboard /> }>
              {/* <Route index element={<ProductDashboard />} /> */}
              <Route path='authenticatedUsers' element={ <AuthenticatedUsers /> }  /> 
              <Route path="adddashboardproduct" element={<AddDashboardProduct />   } />
              <Route path="adddashboardcategory" element={<AddDashboardCategory /> } />
            </Route>
          </Route>
          



        </Routes>
      </Router>
    </>
  );
}

export default App;
