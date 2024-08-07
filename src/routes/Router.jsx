import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./ProtectRouter.jsx";
import MainPage from "../components/MainPage.jsx";
import Auth from "../components/Login/Auth.jsx";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true, // path: "/"
        element: <MainPage />,
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: <h1>Articulos</h1>,
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <h5>Ruta protegida</h5>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "login",
        element: <Auth />,
      },
      {
        path: "songs",
        element: <h5>Aqui canciones</h5>,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <h5>Ruta protegida perfil</h5>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export { Router };
