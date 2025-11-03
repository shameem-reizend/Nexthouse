import React from 'react';
import { Navigate } from 'react-router-dom';
import { connectSocket } from '../utility/socket';

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
    const socket = connectSocket(user.user_id);
    socket.emit('get-user', user.user_id);

    if(
      allowedRoles && ! allowedRoles.includes(role as "admin" | "user" )
    ){
      return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
}
