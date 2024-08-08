import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import Carousel from "./components/Carousel";
import ListSongs from "./components/ListSongs";


import "./styles/FooterBar.css";
import "./styles/HeaderBar.css";
import "./styles/mainPage.css";
import "./styles/Auth.css";
import "./styles/CardAlbums.css";
import "./styles/ListAlbums.css";
import "./styles/CardSongs.css";
import "./styles/ListSongs.css";
import "./styles/Carousel.css";
import "./styles/Fondo.css";

function App() {
  return (
    <>
      <HeaderBar />
      <main>
      <Carousel />
      
      <ListSongs />
      </main>
      <FooterBar />
    </>
  );
}

export default App;
