import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown'
import logo from '../../assets/images/noBg-logo.png'
import campus from '../../assets/images/Campus.jpg'
import '../SignIn-SignUp.css'
import axios from 'axios'


function SignUp() {
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        //add code here to change the language of the application
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [university, setUniversity] = useState('');
    const [a,b]= useState([{}])
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleUniversityChange = (e) => {
        setUniversity(e.target.value);
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if email format is correct (you can use a regex for this)
        if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
            try {
                const response = await axios.post('http://localhost:3000/auth/signup', { email, password, userType, university});
                console.log('Response:', response.data);
                localStorage.setItem('email', email);
                // Navigate to the '/register/account' route only after successful signup
                navigate('/register/account');
                
            } catch (error) {
                console.error('Error signing up:', error.response.data.message);
                // Handle errors, e.g., display an error message to the user
            }
        } else {
            // Handle incorrect email format (e.g., display an error message)
            console.log('Email format is incorrect');
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
                <h1 className='title'>S'inscrire !</h1>
                <div>
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
                        <select className='login-input form-select' value={userType} onChange={handleUserTypeChange} required>
                            <option value="">Type</option>
                            <option value="student">Etudiant</option>
                            <option value="teacher">Enseignant</option>
                        </select>
                        <select className='login-input form-select' value={university} onChange={handleUniversityChange} required>
                            <option value="">Université</option>
                            <option value="FST">FST</option>
                            <option value="ENIT">ENIT</option>
                            <option value="FSEG">FSEG</option>
                        </select>
                        <button className='submit-button' type="submit">S'inscrire </button>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default SignUp