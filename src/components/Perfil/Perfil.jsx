import { useState, useEffect } from 'react';
import Logout from '../Login/Logout.jsx';
import ProfileForm from './ProfileForm.jsx';
import "./Perfil.css";

const Perfil = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const token = localStorage.getItem("authToken");

    const fetchProfileData = async () => {
        try {
            const response = await fetch('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
                headers: {
                    'Authorization': `token ${token}`, 
                },
            });
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [token]);

    const handleEditProfile = () => {
        setIsEditing(true); 
    };

    const handleCloseForm = () => {
        setIsEditing(false); 
    };

    const handleProfileUpdate = () => {
        fetchProfileData();
        setIsEditing(false);
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <section className="fondo">
            <div className="perfil-container">
                <h1 className="titulo-perfil">Perfil de Usuario</h1>
                <div className="perfil-info">
                    <p>Nombre de Usuario: {profile.username}</p>
                    <p>ID: {profile.user__id}</p>
                    <p>Nombre: {profile.first_name}</p>
                    <p>Apellido: {profile.last_name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Fecha de Nacimiento: {profile.dob ? profile.dob : 'No proporcionada'}</p>
                    <p>Biografía: {profile.bio ? profile.bio : 'No proporcionada'}</p>
                    <p>Creado el: {new Date(profile.created_at).toLocaleString()}</p>
                    <p>Actualizado el: {new Date(profile.updated_at).toLocaleString()}</p>
                </div>
                <div className="boton-container">
                    <button className="perfil-cambiar-contra" onClick={handleEditProfile}>Editar Perfil</button>
                </div>
                <div className="boton-container">
                    <div className="boton-container-cerrarsesion">
                        <Logout />
                    </div>
                </div>
            </div>
            {isEditing && (
                <ProfileForm userId={profile.user__id} onClose={handleCloseForm} onUpdate={handleProfileUpdate} />
            )}
        </section>
    );
};

export default Perfil;