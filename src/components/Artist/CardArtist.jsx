function CardArtist({ name, bio, image, website }) {
  return (
    <div className="">
      <img src={image || "/src/assets/mini_logo.jpg"} alt={name} />
      <h3>{name}</h3>
      <p>{bio || "No hay datos sobre su bio"}</p>
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer">
          Visit website
        </a>
      )}
    </div>
  );
}

export default CardArtist;
