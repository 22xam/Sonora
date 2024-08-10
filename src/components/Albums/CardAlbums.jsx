import { format } from "date-fns";
import ArtistField from "../Artist/ArtistField";
import "./CardAlbums.css";

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    console.log(date);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  } catch (error) {
    console.error("Error formatiando fecha:", error);
    return "Fecha Invalida";
  }
}

function CardAlbums({
  id,
  created_at,
  updated_at,
  title,
  year,
  cover,
  artist,
  owner,
}) {
  
  return (
    <div className="album-card">
      <img
        src={cover || "/src/assets/mini_logo.jpg"}
        alt={`${title} cover`}
        className="album-image"
      />
      <div className="details">
        <div className="title">
          <strong></strong> {title}
        </div>
        <div className="letras">
          <strong className="letras">Año: </strong> {year ? year : "N/A"}
        </div>
        <div >
          <strong className="letras">Artista: </strong>{" "}
          <ArtistField artistId={artist} field="name" />
        </div>
        <div className="bio">
          <strong className="letras">Biografia </strong>{" "}
          <p>
            <ArtistField artistId={artist} field="bio" />
          </p>
        </div>
        <div>
          <strong className="letras">Sitio Web: </strong>{" "}
          <ArtistField artistId={artist} field="website" />
        </div>
        <div className="botones-albums">
          <label className="btn-abrir">
            Abrir <i className="las la-comments"></i>
          </label>
          <label className="btn-editar">
            Editar <i className="las la-edit"></i>
          </label>
          <label className="btn-eliminar">
            Eliminar <i className="las la-trash"></i>
          </label>
        </div>
      </div>
    </div>
  );
}

export default CardAlbums;
