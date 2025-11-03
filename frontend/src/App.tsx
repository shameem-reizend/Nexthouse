import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/sonner";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Register } from "./pages/Register";
import LikedProducts from "./pages/LikedProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import Products from "./pages/product/Products";
import { Event } from "./pages/event/Event";
import Profile from "./pages/profile/ProfilePage";
import MyInvitations from "./pages/invitations/MyInvitations";
import MyProducts from "./pages/product/MyProducts";
import { OrderListing } from "./pages/order/OrderListing";
import ProductProvider from "./components/products/ProductProvider";
import AdminDashboard from "./pages/admin/dashborad/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminEvents from "./pages/admin/events/AdminEvents";
import ProductListing from "./pages/admin/dashborad/ProductListing";
import CategoryPage from "./pages/admin/category/CategoryPage";
import { SampleSocket } from "./pages/messages/Messages";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          {/* Routes for user  */}
            <Route
            element={
              <ProtectedRoutes allowedRoles={["user"]}>
                <ProductProvider>
                <Layout/>
                </ProductProvider>
              </ProtectedRoutes>
            }
            >
              <Route path="/profile" element={<Profile/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/my-product" element={<MyProducts/>} />
              <Route path="/likedProducts" element={<LikedProducts/>} />
              <Route path="/invitations" element={<MyInvitations/>} />
              <Route path="/events" element={<Event/>} />
              <Route path="/order" element={<OrderListing/>} />
              <Route path="/message" element={<SampleSocket/>} />

            </Route>
            {/* ROutes for admin  */}
            <Route
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Layout/>
              </ProtectedRoutes>
            }
            >
              <Route path="admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="admin/events" element={<AdminEvents/>}/>
              <Route path="admin/products" element={<ProductListing/>}/>
              <Route path="admin/category" element={<CategoryPage/>}/>
              

            </Route>
            <Route path="not-found" element={<NotFound/>}/>

          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};
