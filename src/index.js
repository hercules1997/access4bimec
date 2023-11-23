import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import GlobalStyles from "./styles/globalStyles";
import AppProvider from "./hooks";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AppProvider>
      <Routes />
    </AppProvider>

    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      transition={Flip}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />

    <GlobalStyles />
  </>
);
