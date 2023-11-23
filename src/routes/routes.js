import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import App from "../containers/App";
import paths from "../constants";
import { Login } from "../containers/App/Login";
import { PrivateRoute } from "./private-route";

function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={paths.Login} element={<Login path={paths.Login} />} />

        <Route
          path={paths.ListRegisters}
          element={
            <PrivateRoute redirectTo={paths.Login}>
              <App path={paths.ListRegisters} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.Cadastro}
          element={
            <PrivateRoute redirectTo={paths.Login}>
              <App path={paths.Cadastro} />
            </PrivateRoute>
          }
        />

        <Route
          path={paths.RegisterOpen}
          element={
            <PrivateRoute redirectTo={paths.Login}>
              <App path={paths.RegisterOpen} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.Status}
          element={
            <PrivateRoute redirectTo={paths.Login}>
              <App path={paths.Status} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.GenerateReport}
          element={
            <PrivateRoute redirectTo={paths.Login}>
              <App path={paths.GenerateReport} />
            </PrivateRoute>
          }
        />

        <Route
          path={paths.Deshboard}
          element={
            <PrivateRoute component={App}>
              <App path={paths.Deshboard} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.EditRegister}
          element={
            <PrivateRoute component={App}>
              <App path={paths.EditRegister} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.CreateUsers}
          element={
            <PrivateRoute component={App}>
              <App path={paths.CreateUsers} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.Users}
          element={
            <PrivateRoute component={App}>
              <App path={paths.Users} />
            </PrivateRoute>
          }
        />
        <Route
          path={paths.EditUser}
          element={
            <PrivateRoute component={App}>
              <App path={paths.EditUser} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AllRoutes;
