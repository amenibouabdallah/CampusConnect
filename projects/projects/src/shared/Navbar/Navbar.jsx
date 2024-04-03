import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

    return (
        <nav className='navig-menu'>
            <div className="logo-cont">
                <NavLink exact to="/"> <img className='nav-logo' src={logo} alt="Logo" /></NavLink>

            </div>
            <div className='navs'>
                <NavLink className='nav' exact to="/meals" activeClassName="active">Documents</NavLink>
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
                <NavLink className='profile' to="/profile">
                    <img className='prof-img' src={fakeUser.profilePicture} alt="Profile" />
                </NavLink>
            </div>
        </nav>
    );
};

export default NavigationMenu;
