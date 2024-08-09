import React, { useState } from "react";
import axios from "axios";

function CreateArtist() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [websiteError, setWebsiteError] = useState(null);

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
            Authorization: "Token b309c840f86b9f63548c680f36c7e6ef1e62dc00",
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
    <div>
      <h2>Crear Nuevo Artista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Biografía</label>
          <textarea id="bio" value={bio} onChange={handleBioChange} required />
        </div>
        <div>
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
        <div>
          <button type="submit" disabled={loading || websiteError}>
            {loading ? "Creando..." : "Crear Artista"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArtist;
