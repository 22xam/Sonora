import "./CardArtist.css";

function CardArtist({ name, bio, image, website }) {
  return (
    <div className="artist-card">
      <img 
        src={image || "/src/assets/mini_logo.jpg"} 
        alt={name}
        className="artist-image" 
      />
      <div className="details">
        <h3 className="letras">Artista:  {name}</h3>
        <song className="letras">Biografía:</song>
        <p className="bio"> {bio || "No hay datos sobre su bio"}</p>
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visita su sitio web haciendo click aquí
          </a>
        )}
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

export default CardArtist;
