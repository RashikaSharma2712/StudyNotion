import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
   const { token } = useSelector((state) => state.auth);
   const location = useLocation();

   if (!token) {
     return <Navigate to="/login" state={{ from: location }} replace />
   }

   return children;
}
