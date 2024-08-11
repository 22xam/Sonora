import { useState } from "react";
import axios from "axios";
import ArtistListBox from "../Artist/ArtistListBox.jsx";
import { useNavigate } from "react-router-dom";
import "./ModalcreateAlbums.css";

function ModalCreateAlbums() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [artistId, setArtistId] = useState(null);

  const token = localStorage.getItem("authToken"); //import.meta.env.VITE_API_TOKEN;

  const navigate = useNavigate();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleYearChange = (event) => setYear(event.target.value);

  const handleArtistSelect = (id) => {
    setArtistId(id);
    console.log("Artista seleccionado con ID:", id);
  };

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
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Álbum creado:", response.data);
      swal({
        title: "Albumn Creador con exito",
        text: "Gracias por ser parte de la comunidad SONORA",
        icon: "success",
        buttons: "Aceptar",
        timer: "2000",
      });
      navigate("/Albums/List");
    } catch (error) {
      console.error("Error al crear:", error.response.data.non_field_errors);
      alert("Error al crear el álbum");
    }
  };

  return (
    <section className="fondo">
      <div className="crear-album">
        <article>
          <div className="titulo-agregar">
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
                  required
                />
              </div>
              <div className="titulos">
                <label htmlFor="year">Año</label>
                <input
                  type="number"
                  id="year"
                  value={year}
                  onChange={handleYearChange}
                  required
                />
              </div>
              <div className="titulodespl">
                <ArtistListBox onArtistSelect={handleArtistSelect} />
              </div>

              <div className="button-container">
                <button className="boton-agregar-albun" type="submit">
                  Agregar Álbum
                </button>
              </div>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}

export default ModalCreateAlbums;
