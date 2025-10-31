import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles:Array<"admin" | "user">
}

export const ProtectedRoutes: React.FC <ProtectedRouteProps> = ({children,allowedRoles}) => {

    const token = localStorage.getItem('accessToken');
    const user =JSON.parse(localStorage.getItem("userData") || "null")
    const role = user.role;
   

    if(!token){
        return <Navigate to="/" replace />;
    }

    if(
      allowedRoles && ! allowedRoles.includes(role as "admin" | "user" )
    ){
      return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
}
