import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios';

function SignIn() {
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        //add code here to change the language of the application
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/signin',{email:email, password:password});
            console.log("Response:", response.data);
        }catch(error){
            console.error('Error:', error.response.data.message);
            setShowAlert(true);
        }
    };


    return (
        <div className='login-view'>
            {showAlert && (
                <div className="alert alert-danger" role="alert">
                    Identifiant ou mot de passe incorrect.
                </div>
            )}
            <div className='left-part'>
                <div className='logolang'>
                    <div className='lang'>
                        <LanguageDropdown currentLang={currentLang} changeLanguage={changeLanguage} />
                    </div>
                    <div className='logo'>
                        <img className='nobg-logo' src={logo} alt="" />
                    </div>
                </div>
                <h1 className='title'>Bienvenue !</h1>
                <div >
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Mot de passe"
                            required
                        />
                        <div className='lost-password'>
                            <p className='mdp'>Mot de passe oublié ?</p>
                            <Link className='mdp' to="/account/reset/request">Rénitialiser le mot de passe</Link>
                        </div>
                        <button className='submit-button' type="submit">Se Connecter </button>
                        <div className='signup'>
                            <span className='mdp'>Vous n’avez pas de compte ? <Link className='mdp' to="/register">Créer un compte</Link></span>
                        </div>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default SignIn
