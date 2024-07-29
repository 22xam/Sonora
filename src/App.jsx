import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import MainPage from "./components/MainPage";

import "./styles/FooterBar.css";
import "./styles/HeaderBar.css";
import "./styles/mainPage.css";

function App() {
  return (
    <>
      <body>
        <HeaderBar />

        <MainPage />

        <FooterBar />
      </body>
    </>
  );
}

export default App;
