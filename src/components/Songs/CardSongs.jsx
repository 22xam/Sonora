import PropTypes from "prop-types";
import "../Songs/CardSongs.css";

function CardSong({ song }) {
  return (
    <div className="song-card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className={"song-name"}>{song.title}</p>
          </div>
        </div>
        <div className="content audio-player">
          <audio controls>
            <source src={song.song_file} type="audio/mpeg" />
            El navegador no soporta el elemento de audio.
          </audio>
        </div>
        <div className="botones-songs">
          <label className="btn-eliminar">
            Eliminar <i className="las la-trash"></i>
          </label>
        </div>
      </div>
    </div>
  );
}

CardSong.propTypes = {
  song: PropTypes.shape({
    title: PropTypes.string.isRequired,
    song_file: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardSong;
