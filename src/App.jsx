import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import MainPage from "./components/MainPage";
import Auth from "./components/Auth";

import "./styles/FooterBar.css";
import "./styles/HeaderBar.css";
import "./styles/mainPage.css";
import "./styles/Auth.css";

function App() {
  return (
    <>
      <HeaderBar />
      <MainPage />
      <FooterBar />
    </>
  );
}

export default App;
