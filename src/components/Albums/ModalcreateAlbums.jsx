import { useState } from "react";
import axios from "axios";
import ArtistSelector from "../Artist/ArtistSelector.jsx";
import "./Modalcreatealbums.css";

function ModalCreateAlbums() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [artistId, setArtistId] = useState(null);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);
  const handleArtistChange = (selectedId) => setArtistId(selectedId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const albumData = {
      title,
      year: parseInt(year, 10),
      artist: artistId,
    };
    console.log(albumData);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "harmonyhub/albums/",
        albumData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token b309c840f86b9f63548c680f36c7e6ef1e62dc00",
          },
        }
      );
      console.log("Albums creado:", response.data);
    } catch (error) {
      console.error("Error al crear:", error.response.data.non_field_errors);
      alert("Error creating album");
    }
  };

  return (
    <section className="fondo">
      <div className="crear-album">
        <article>
          <div>
            <h2>Agregar un nuevo álbum</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="titulos">
                <label htmlFor="title">Nombre del álbum</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="titulos">
                <label htmlFor="year">Año</label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                />
              </div>
              <div className="titulodespl">
                <ArtistSelector onArtistChange={handleArtistChange} />
              </div>
              <div className="button-container">
                <button type="submit">Agregar Álbum</button>
              </div>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}

export default ModalCreateAlbums;
