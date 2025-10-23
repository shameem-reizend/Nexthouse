import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { ToastContainer } from 'react-toastify'
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Register } from './pages/Register';

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={
            <ProtectedRoutes>
                <Home />
            </ProtectedRoutes>
          }/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </>
  )
}
