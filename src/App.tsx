import { useState, useEffect } from "react";
import { persistor, Store } from "./app/Store";
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import MainDashboard from "./adminSide/mainDashboard";
import AuthenticatedUsers from "./adminSide/adminSection";
import Navbar from "./components/commoncomponent/navbarTopbar";
import LoginPage from "./components/commoncomponent/loginsignup/LoginPage";
import SignUpPage from "./components/commoncomponent/loginsignup/SignUpPage";
import ProtectedRoute from "./adminSide/protectroutes";
import AddDashboardCategory from "./adminSide/dashboardpages/addDashboardCategory";
import AddDashboardProduct from "./adminSide/dashboardpages/addDashboardProduct";
import Cart from "./clientside/pages/Cart";
import OrderConfirmation from "./clientside/pages/OrderConfirmation";
import CheckOutPage from "./clientside/pages/CheckOutPage";
import NotFoundPage from "./clientside/pages/NotFoundPage";
import CurrentUserProfilePage from "./clientside/pages/CurrentUserProfilePage";
import OrderManagement from "./adminSide/dashboardpages/ordermanagement/OrderManagement";
import ContactUs from "./clientside/pages/ContactUs";
import OurOrganicProducts from "./clientside/ourorganicproducts";
import OrderHistory from "./clientside/pages/OrderHistoryPage";
import ProductDetailPage from "./clientside/pages/ProductDetailPage";
import Home from "./clientside/home";
import TestimonialCarousel from "./clientside/ourtestimonials";
import { PersistGate } from "redux-persist/integration/react";

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
            }
          } catch (error) {
            console.error("Failed to fetch user role:", error);
          }
        }
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
      return <Navigate to="/" replace />;
    }

    return children;
  };

   const DashboardAccessGuard = ({ children }) => {

    if (isAuthenticated && userData?.role !== "admin") {
    
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor} >

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
              <Home />
            }
          />

          <Route element={<AuthGuard> <Outlet /> </AuthGuard>} >
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/current-user-profile-page" element={<CurrentUserProfilePage />} />
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
              <Route path="ordermanagement" element={<OrderManagement />} />

            </Route>
          </Route>


          <Route path="/not-found-page" element={<NotFoundPage />} />
          <Route path="/testimonials"   element={ <TestimonialCarousel /> } />
          <Route path="/order-history"  element={ <OrderHistory /> } />
          <Route path="/product/:id"    element={ <ProductDetailPage /> }   />
          <Route path="/contact-us" element={ <ContactUs />  } />
          <Route path="/shop-page" element={<OurOrganicProducts  showSearchBar filterByCategory={false} />} />

          <Route
            path="/login"
            element={<GuestGuard><LoginPage setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} /></GuestGuard>}
          />
          <Route path="/signup" element={
            <GuestGuard>
            <SignUpPage />
            </GuestGuard>
            } />


          <Route path="*" element={<Navigate to="/not-found-page" replace />} />
        </Routes>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;