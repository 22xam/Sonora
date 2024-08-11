import { useState } from "react";
import axios from "axios";
import "./CreateArtist.css";

function CreateArtist() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [websiteError, setWebsiteError] = useState(null);
  
  const { token } = localStorage.getItem("authToken");

  const handleNameChange = (event) => setName(event.target.value);
  const handleBioChange = (event) => setBio(event.target.value);
  const handleWebsiteChange = (event) => {
    const value = event.target.value;
    setWebsite(value);

    // Validación del formato del sitio web
    const urlPattern = /^https?:\/\/www\./;
    if (!urlPattern.test(value)) {
      setWebsiteError(
        'El sitio web debe comenzar con "http://www" o "https://www".'
      );
    } else {
      setWebsiteError(null); // Limpia el mensaje de error si es válido
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // No continuar si hay un error en la URL
    if (websiteError) {
      setLoading(false);
      return;
    }

    const artistData = {
      name,
      bio,
      website,
    };

    try {
      const response = await axios.post(
        "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
        artistData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      );
      alert("Artista creado exitosamente");
      setName("");
      setBio("");
      setWebsite("");
    } catch (error) {
      console.error("Error al crear el artista:", error);
      setError(
        "Hubo un error al crear el artista. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fondo">
      <div className="agregar-artista">
        <article>
          <div>
            <h2 className="titulo-agregar-artista">Agregar Nuevo Artista</h2>
            <div>
            <form onSubmit={handleSubmit}>
              <div className="titulos">
                <label htmlFor="name">Nombre del Artista</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="titulo-biog">
                <label htmlFor="bio">Biografía</label>
                <textarea id="bio" value={bio} onChange={handleBioChange} required />
              </div>
              <div className="titulos">
                <label htmlFor="website">Sitio Web</label>
                <input
                  type="text"
                  id="website"
                  value={website}
                  onChange={handleWebsiteChange}
                />
                {websiteError && <p style={{ color: "red" }}>{websiteError}</p>}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="button-container">
                <button className="boton-agregar-artista" type="submit" disabled={loading || websiteError}>
                  {loading ? "Agregando..." : "Agregar Artista"}
                </button>
              </div>
            </form>
            </div>
          </div>
        </article>
      </div>  
    </section>
  );
}

export default CreateArtist;
