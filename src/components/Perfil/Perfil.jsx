import './Perfil.css';

const Perfil = ({ user, id, }) => {
    return (
        <section className="fondo">
            <div className="perfil-container">
                <h1 className= "titulo-perfil">Perfil de Usuario</h1>
            <div className="perfil-info">
                <p>Nombre: {user}</p>
                <p>ID: {id}</p>
            </div >
            <div className= "boton-container">
                <button className="perfil-cambiar-contra">Cambiar Contraseña</button>
            </div>
            <div className= "boton-container">  
                <button className="perfil-cerrar-sesion">Cerrar Sesión</button>
            </div>
            </div>
        </section>
    );
};

export default Perfil;