import React, { useState } from 'react'
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function VerifyAccountReset() {
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language
    const navigate = useNavigate();
    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        //add code here to change the language of the application
    };
    const [codes, setCodes] = useState(['', '', '', '', '', '']);

    const handleCodeChange = (e, index) => {
        const newCodes = [...codes];
        newCodes[index] = e.target.value;
        setCodes(newCodes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        const verificationCode = codes.join('');
        try{
            const response = await axios.post('http://localhost:3000/auth/confirm-code-forgot',{email,verificationCode});
            console.log(response);
            navigate('/account/reset');
        }catch(error){
            console.error('Error resetting profile profile:', error);

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
                <div>
                    <p className='mdp verify'>Veuillez vérifier votre adresse mail <br /> </p>
                    <form onSubmit={handleSubmit} className='login-form' >
                        <div className='code-inputs'>
                            {codes.map((code, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={code}
                                    onChange={(e) => handleCodeChange(e, index)}
                                    className='input-code'
                                    placeholder='*'
                                    required
                                />
                            ))}
                        </div>
                        <br />
                        <button className='submit-button' type="submit">Valider </button>

                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default VerifyAccountReset
