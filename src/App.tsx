import { useState, useEffect } from "react";
import { Store } from './app/Store';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import MainDashboard from "./components/adminSide/mainDashboard/MainDashboard";
import AuthenticatedUsers from "./components/adminSide/adminSection/AuthenticatedUsers";
import HeroBanner from "./components/clientside/hero/HeroBanner";
import FeatureHighlights from "./components/clientside/featuresHighlight/FeatureHighlights";
import ProductSection from "./components/clientside/productDisplaySection/OrganicProductSection";
import CardsGrid from "./components/clientside/cardgrid/CardsGrid";
import CaruselProductsDisplay from "./components/clientside/caruselProducts/CarouseProductsDisplayl";
import Footer from "./components/clientside/footer/Footer";
import Navbar from "./components/clientside/navbarTopbar/Navbar";
import StatsSection from "./components/clientside/statssection/StatsSection";
import OurTestimonial from "./components/clientside/ourtestimonials/OurTesttimonial";
import BestsellerProductsSection from "./components/clientside/bestsellerproducts/BestSellerProductsSection";
import PromoBanner from "./components/clientside/promobanner/PromoBanner";
import BestsellerProductTwo from "./components/clientside/bestsellerproducts/BestSellerProductTwo";
import LoginPage from "./components/clientloginSignUp/LoginPage";
import SignUpPage from "./components/clientloginSignUp/SignUpPage";
import FirstCounter from "./features/counter/FirstCounter";
import ProductreduxDashboard from "./features/products/ProductreduxDashboard";

import ProtectedRoute from "./components/adminSide/protectroutes/ProtectedRoutes";
import AddDashboardCategory from "./components/adminSide/dashboardpages/addDashboardCategory/AddDashboardCategory";
import AddDashboardProduct from "./components/adminSide/dashboardpages/addDashboardProduct/AddDashboardProduct";
import Cart from "./components/clientside/pages/Cart";
import OrderConfirmation from "./components/clientside/pages/OrderConfirmation";
import OrderHistory from "./components/clientside/pages/OrderHistoryPage";
import CheckOutPage from "./components/clientside/pages/CheckOutPage";
import NotFoundPage from "./components/clientside/pages/NotFoundPage";
import CurrentUserProfilePage from "./components/clientside/pages/CurrentUserProfilePage";
import OrderManagement from "./components/clientside/pages/OrderManagement";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [userData, setUserData] = useState<string>(JSON.parse(localStorage.getItem("user") || null));
  console.log("userRole", userData);





  useEffect(() => {
    const syncAuth = async () => {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);

      if (auth) {
        const email = userData?.email;
        if (email) {
          try {
            const res = await fetch(`http://localhost:3000/fruitablesusers?email=${email}`);
            const users = await res.json();
            if (users.length > 0) {
              // setUserRole(users[0].role);
            }
          } catch (error) {
            console.error("Failed to fetch user role:", error);
          }
        }
      } else {
        // setUserRole("");
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
        userData={userData}
        setUserData={setUserData}
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, userData, setUserData }) {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("userEmail");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
  };


  const DashboardGuard = ({ children }) => {


    if (userData?.role === "admin") {

      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  };

  const AuthGuard = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }

    return children;
  }

  const GuestGuard = ({ children }) => {

    if (isAuthenticated) {
      // If already logged in, go home or dashboard
      return <Navigate to="/" replace />;
    }

    return children;
  };

   const DashboardAccessGuard = ({ children }) => {

    if (isAuthenticated && userData?.role !== "admin") {
      // If already logged in, go home or dashboard
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <>
      <Provider store={Store}>
        {!hideNavbar && (
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            userData={userData}
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

          <Route element={<AuthGuard> <Outlet /> </AuthGuard>} >
            <Route path="/counter" element={<FirstCounter />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/current-user-profile-page" element={<CurrentUserProfilePage />} />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route
              path="/dashboard"
              element={
                <DashboardGuard>
                  <MainDashboard/>
                </DashboardGuard>
              }
            >
              <Route index element={<AuthenticatedUsers />} />
              <Route path="authenticatedusers" element={<AuthenticatedUsers />} />
              <Route path="adddashboardproduct" element={<AddDashboardProduct />} />
              <Route path="adddashboardcategory" element={<AddDashboardCategory />} />
            </Route>
          </Route>


          <Route path="/not-found-page" element={<NotFoundPage />} />
          <Route path="/reduxdashboard" element={<ProductreduxDashboard />} />

          <Route
            path="/login"
            element={<GuestGuard><LoginPage setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} /></GuestGuard>}
          />
          <Route path="/signup" element={
            <GuestGuard>
            <SignUpPage />
            </GuestGuard>
            } />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;