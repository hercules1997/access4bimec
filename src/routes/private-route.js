// import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom"; // Importe useNavigate

import paths from "../constants";
// import { Login } from "../containers";

export function PrivateRoute({ children, redirectTo, isAdmin }) {
  const user = localStorage.getItem("acesso4bimec:users");

  if (isAdmin && !JSON.parse(user).admin) {
    return <Navigate to={paths.Deshboard} />;
  }

  return (
    <React.Fragment>
      {user ? children : <Navigate to={redirectTo} />}
    </React.Fragment>
  );
}

// PrivateRoute.propTypes = {
//   children: PropTypes,
//   isAdmin: PropTypes.bool,
// };
