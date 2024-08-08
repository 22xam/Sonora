import { useEffect, useState } from "react";
import CardAlbums from "./CardAlbums";
import HeaderAlbums from "./HeaderAlbums";
import "./ListAlbums.css";

const ListAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const { token } = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/harmonyhub/albums/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAlbums(data.results);
        } else {
          console.error(
            "Error al recuperar los albunes:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al recuperar los albunes:", error);
      }
    };


    fetchAlbums();
  }, [token]);

  return (
    <>
      <HeaderAlbums />
      <section className="fondo">
        <div className="album-list">
          <h2 className="title album-list-title">Lista de Albumes</h2>
          <ul className="album-list-grid">
            {albums.map((album) => (
              <CardAlbums
                key={album.id} 
                id={album.id}
                created={album.created_at}
                update={album.updated_at}
                title={album.title}
                year={album.year}
                cover={album.cover}
                artist={album.artist}
                owner={album.owner}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default ListAlbums;
