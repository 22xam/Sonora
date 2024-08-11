import { useEffect, useState } from "react";
import CardAlbums from "./CardAlbums";
import HeaderAlbums from "./HeaderAlbums";
import "./ListAlbums.css";

const ListAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    import.meta.env.VITE_API_URL + "/harmonyhub/albums/"
  );
  const { token } = localStorage.getItem("authToken"); //import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(currentPageUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAlbums(data.results);
          setFilteredAlbums(data.results);
          setNextPage(data.next);
          setPreviousPage(data.previous);
        } else {
          console.error("Error al recuperar los álbumes:", response.statusText);
        }
      } catch (error) {
        console.error("Error al recuperar los álbumes:", error);
      }
    };

    fetchAlbums();
  }, [currentPageUrl, token]);

  useEffect(() => {
    const results = albums.filter((album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlbums(results);
  }, [searchTerm, albums]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPageUrl(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setCurrentPageUrl(previousPage);
    }
  };
  // Funcion para recargar la lista
  const refreshAlbumList = async () => {
    try {
      const response = await fetch(currentPageUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlbums(data.results);
        setFilteredAlbums(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } else {
        console.error("Error al recuperar los álbumes:", response.statusText);
      }
    } catch (error) {
      console.error("Error al recuperar los álbumes:", error);
    }
  };

  return (
    <>
      <HeaderAlbums />
      <section className="fondo">
        <input
          type="text"
          placeholder="Busca aquí tu álbum preferido"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="album-list">
          <ul className="album-list-grid">
            {filteredAlbums.map((album) => (
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
                onAlbumUpdated={refreshAlbumList}
              />
            ))}
          </ul>
        </div>
        <div className="control-paginas">
          <button
            className="Ant-Sig"
            onClick={handlePreviousPage}
            disabled={!previousPage}
          >
            Anterior
          </button>
          <button
            className="Ant-Sig"
            onClick={handleNextPage}
            disabled={!nextPage}
          >
            Siguiente
          </button>
        </div>
      </section>
    </>
  );
};

export default ListAlbums;
