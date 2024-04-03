import React, { useState } from 'react'
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PasswordResetMail() {
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        //add code here to change the language of the application
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/auth/forgot-password',{email:email});
            console.log("Response:", response.data);
            localStorage.setItem('email', email);
            navigate("/account/reset/verify");
        }catch(error){
            console.error('Error:', error.response.data.message);
            setShowAlert(true);
        }
    };

    return (
        <div className='login-view'>
            <div className='left-part'>
                <div className='logolang'>
                    <div className='lang'>
                        <LanguageDropdown currentLang={currentLang} changeLanguage={changeLanguage} />
                    </div>
                    <div className='logo'>
                        <img className='nobg-logo' src={logo} alt="" />
                    </div>
                </div>
                <h1 className='title'>Rénitialiser le mot de passe !</h1>
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
                        <button className='submit-button' type="submit">Récupérer </button>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default PasswordResetMail
