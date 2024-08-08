import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.jsx";
import HeaderBar from "./components/HeaderBar/HeaderBar.jsx";
import FooterBar from "./components/FooterBar/FooterBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <HeaderBar />
    <RouterProvider router={Router} />
    <FooterBar />
  </>
);
