import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import MainPage from "./components/MainPage";
import Auth from "./components/Auth";
import CardAlbums from "./components/CardAlbums";
import ListAlbums from "./components/ListAlbums";
import HeaderAlbums from "./components/HeaderAlbums";
import ModalCreateAlbums from "./components/ModalcreateAlbums";

import "./styles/FooterBar.css";
import "./styles/HeaderBar.css";
import "./styles/mainPage.css";
import "./styles/Auth.css";
import "./styles/CardAlbums.css";
import "./styles/ListAlbums.css";
import "./styles/headeralbums.css";
import "./styles/modalcreatealbums.css";

function App() {
  return (
    <>
      <ModalCreateAlbums />
      <ListAlbums />
    </>
  );
}

export default App;
