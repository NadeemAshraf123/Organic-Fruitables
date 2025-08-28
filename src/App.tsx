import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
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
// import AddProductCategory from "./components/pages/AddProductCategory";
// import AddProductPage from "./components/pages/AddProductPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";

import ProtectedRoute from "./components/protectroutes/ProtectedRoutes";
import AddDashboardCategory from "./components/dashboardpages/addDashboardCategory/AddDashboardCategory";
import AddDashboardProduct from "./components/dashboardpages/addDashboardProduct/AddDashboardProduct";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const syncAuth = async () => {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);

      if (auth) {
        const email = localStorage.getItem("userEmail");
        if (email) {
          try {
            const res = await fetch(`http://localhost:3000/fruitablesusers?email=${email}`);
            const users = await res.json();
            if (users.length > 0) {
              setUserRole(users[0].role);
            }
          } catch (error) {
            console.error("Failed to fetch user role:", error);
          }
        }
      } else {
        setUserRole("");
      }
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userRole={userRole}
        setUserRole={setUserRole}
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, userRole, setUserRole }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserRole("");
  };

  // Custom protection for dashboard routes
  const DashboardGuard = ({ children }) => {
    if (!isAuthenticated) {
      // Unauthenticated users go to login
      return <Navigate to="/login" replace />;
    }
    
    if (userRole === "admin") {
      // Admin users can access dashboard
      return children;
    }
    
    // Regular authenticated users go to home page
    return <Navigate to="/" replace />;
  };

  return (
    <>
      {!hideNavbar && (
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          userRole={userRole}
        />
      )}

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

        {/* <Route path="/add-product" element={<AddProductPage />} /> */}
        {/* <Route path="/add-category" element={<AddProductCategory />} /> */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
        />
        <Route path="/signup" element={<SignUpPage />} />

    
        <Route
          path="/dashboard"
          element={
            <DashboardGuard>
              <MainDashboard />
            </DashboardGuard>
          }
        >
          <Route index element={<AuthenticatedUsers />} />
          <Route path="authenticatedusers" element={<AuthenticatedUsers />} />
          <Route path="adddashboardproduct" element={<AddDashboardProduct />} />
          <Route path="adddashboardcategory" element={<AddDashboardCategory />} />
        </Route>

        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;