import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/noBg-logo.png';
import profile from '../../assets/images/profile.png';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import './Navbar.css'

const NavigationMenu = ({ user }) => {
    const fakeUser = {
        profilePicture: profile, // Chemin d'accès à l'image de profil fictive
        userType: "teacher",
    };
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        //add code here to change the language of the application
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        // Supprimer les informations d'authentification de l'utilisateur
        // Par exemple, en supprimant le token d'authentification du localStorage
        localStorage.removeItem('token');

        // Rediriger l'utilisateur vers la page de connexion
        navigate('/');
    };

    return (
        <nav className='navig-menu'>
            <div className="logo-cont">
                <img className='nav-logo' src={logo} alt="Logo" />

            </div>
            <div className='navs'>
                <NavLink className='nav' exact to="/docs" activeClassName="active">Documents</NavLink>
                <NavLink className='nav' to="/meals" activeClassName="active">Menu</NavLink>
                <NavLink className='nav' to="/transport" activeClassName="active">Transport</NavLink>
                {fakeUser.userType === "teacher" && (
                    <NavLink className='nav' to="/upload" activeClassName="active">Déposez un document</NavLink>
                )}
            </div>
            <div className="profile-lang">
                <div className='lang'>
                    <LanguageDropdown currentLang={currentLang} changeLanguage={changeLanguage} />
                </div>
                <div className='logout'>
                    <button className='gestion-btn' onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#FFDA6F" class="bi bi-power" viewBox="0 0 16 16">
                        <path d="M7.5 1v7h1V1z" />
                        <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                    </svg></button>
                </div>
                <NavLink className='profile' to="/profile">
                    <img className='prof-img' src={fakeUser.profilePicture} alt="Profile" />
                </NavLink>
            </div>
        </nav>
    );
};

export default NavigationMenu;
