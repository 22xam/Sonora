import React, { useState } from "react";
import axios from "axios";
import ArtistSelector from "./ArtistSelector";

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
    <section>
      <article>
        <div>
          <h2>Crear un nuevo álbum</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="title">Nombre del álbum</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <label htmlFor="year">Año</label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={handleYearChange}
              />
            </div>
            <div>
              <ArtistSelector onArtistChange={handleArtistChange} />
            </div>
            <div>
              <button type="submit">Crear Álbum</button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}

export default ModalCreateAlbums;
