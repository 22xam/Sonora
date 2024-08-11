import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import ProtectedRoute from "./ProtectRouter.jsx";
import MainPage from "../components/MainPage.jsx";
import Auth from "../components/Login/Auth.jsx";
import ListAlbums from "../components/Albums/ListAlbums.jsx";
import HeaderAlbums from "../components/Albums/HeaderAlbums.jsx";
import Logout from "../components/Login/Logout.jsx";
import ModalcreateAlbums from "../components/Albums/ModalcreateAlbums.jsx";
import ListSongs from "../components/Songs/ListSongs.jsx";
import Carousel from "../components/Decoradores/Carousel.jsx";
import HeaderBar from "../components/HeaderBar/HeaderBar.jsx";

import ListArtist from "../components/Artist/ListArtists.jsx";
import CreateArtist from "../components/Artist/CreateArtist.jsx";
import HeaderArtist from "../components/Artist/HeaderArtist.jsx";

import NotFound from "../components/NotFound/NotFound.jsx";
import ArtistListBox from "../components/Artist/ArtistListBox.jsx";
import Perfil from "../components/Perfil/Perfil.jsx";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true, // path: "/"
        element: (
          <>
            <MainPage />
            <Carousel />
          </>
        ),
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

        element: (
          <ProtectedRoute>
            <ListSongs />
          </ProtectedRoute>
        ),
      },
      {
        path: "Artist",
        children: [
          {
            index: true,
            element: <HeaderArtist />,
          },
          {
            path: "List",
            element: (
              <ProtectedRoute>
                <ListArtist />
              </ProtectedRoute>
            ),
          },
          {
            path: "Create",
            element: (
              <ProtectedRoute>
                <CreateArtist />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "Perfil",
        element: (
          <ProtectedRoute>
            <Perfil />
            <Carousel />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "prueba",
        element: <ArtistListBox />,
      },
    ],
  },
]);

export { Router };
