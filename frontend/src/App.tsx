import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { ToastContainer } from 'react-toastify'
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Register } from './pages/Register';
import Layout from './layout/Layout';
import Products from './pages/product/Products';
import MyProducts from './pages/product/MyProducts';

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          {/* <Route path='/layout' element={<Layout />}/> */}
          <Route element={<Layout/>}>
              <Route path='/' element={
                <ProtectedRoutes allowedRoles={["user"]}>
                    <Home />
                </ProtectedRoutes>
              }/>
              <Route path='/products' element={
                <ProtectedRoutes allowedRoles={["user"]}>
                    <Products />
                </ProtectedRoutes>
              }/>
              <Route path='/my-product' element={<MyProducts/>}/>
            </Route>


        </Routes>
      </Router>
    </>
  )
}
