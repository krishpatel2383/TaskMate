import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const isAuthenticatd = location.state?.email;
  return isAuthenticatd ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
