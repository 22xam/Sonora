import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./ProtectRouter.jsx";
import MainPage from "../components/MainPage.jsx";
import Auth from "../components/Login/Auth.jsx";
import ListAlbums from "../components/Albums/ListAlbums.jsx";
import HeaderAlbums from "../components/Albums/HeaderAlbums.jsx";
import Logout from "../components/Login/Logout.jsx";
import ModalcreateAlbums from "../components/Albums/ModalcreateAlbums.jsx";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true, // path: "/"
        element: <MainPage />,
      },
      {
        path: "Albums",
        children: [
          {
            index: true,
            element: <HeaderAlbums />,
          },
          {
            path: "List",
            element: (
              <ProtectedRoute>
                <ListAlbums />
              </ProtectedRoute>
            ),
          },
          {
            path: "Create",
            element: (
              <ProtectedRoute>
                <ModalcreateAlbums />
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
        element: <ListAlbums />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <h5>Ruta protegida perfil</h5>
            <Logout />
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
