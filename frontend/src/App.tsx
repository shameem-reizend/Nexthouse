import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Register } from "./pages/Register";
import LikedProducts from "./pages/LikedProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import Products from "./pages/product/Products";
import { Event } from "./pages/event/Event";
import Profile from "./pages/Profile";
import MyInvitations from "./pages/invitations/MyInvitations";
import MyProducts from "./pages/product/MyProducts";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <Home />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <Profile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <Products />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/my-product"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <MyProducts />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/likedProducts"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <LikedProducts />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/invitations"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <MyInvitations />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="/events"
                element={
                  <ProtectedRoutes allowedRoles={["user"]}>
                    <Event />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};
