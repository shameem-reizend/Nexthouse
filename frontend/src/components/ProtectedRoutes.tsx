import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoutes: React.FC <ProtectedRouteProps> = ({children}) => {

    const token = localStorage.getItem('accessToken');
    if(!token){
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
