import "../styles/mainPage.css";
import { useAuth } from "./contexts/AuthContext.jsx";

function MainPage() {
  const { isAuthenticated } = useAuth("state");
  // const { user } = localStorage.getItem("user");

  return (
    <section className="banner">
      <article>
        <h1>SONORA</h1>
        <h2>La música que te mueve</h2>
        <p>
          Sonora es un universo sonoro donde conviven todos los géneros.
          Encuentra la banda sonora perfecta para cada momento.
        </p>
        <div className="btn-login">
          {isAuthenticated ? (
            <a href="/perfil"> Estas en Sonora </a>
          ) : (
            <a href="/login"> Ingresa a SONARA</a>
          )}
        </div>
      </article>
    </section>
  );
}

export default MainPage;
