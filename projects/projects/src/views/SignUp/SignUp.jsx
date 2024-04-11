import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import logo from '../../assets/images/noBg-logo.png';
import campus from '../../assets/images/Campus.jpg';
import '../SignIn-SignUp.css';
import axios from 'axios';


function SignUp() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [university, setUniversity] = useState('');
    const [a, b] = useState([{}]);
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
                const response = await axios.post('http://localhost:3000/auth/signup', { email, password, userType, university });
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
                        <LanguageDropdown className="lang-bg" />
                    </div>
                    <div className='logo'>
                        <img className='nobg-logo' src={logo} alt="" />
                    </div>
                </div>
                <h1 className='title'>{t('signUp.welcome')}</h1>
                <div>
                    <form onSubmit={handleSubmit} className='login-form'>
                        <input
                            className='login-input'
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t('signUp.emailPlaceholder')}
                            required
                        />
                        <input
                            className='login-input'
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder={t('signUp.passwordPlaceholder')}
                            required
                        />
                        <select className='login-input form-select' value={userType} onChange={handleUserTypeChange} required>
                            <option value="" disabled>{t('signUp.userType')}</option>
                            <option value="student">{t('signUp.student')}</option>
                            <option value="teacher">{t('signUp.teacher')}</option>
                        </select>
                        <select className='login-input form-select' value={university} onChange={handleUniversityChange} required>
                            <option value="" disabled>{t('signUp.university')}</option>
                            <option value="FST">{t('signUp.fst')}</option>
                            <option value="ENIT">{t('signUp.enit')}</option>
                            <option value="FSEG">{t('signUp.fseg')}</option>
                        </select>
                        <button className='submit-button' type="submit">{t('signUp.signUpButton')}</button>
                    </form>
                </div>
            </div>
            <div className='right-part'>
                <img className='campus' src={campus} alt="" />
            </div>
        </div>
    )
}

export default SignUp;
