import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';

const AdminProfile = () => {
    const user = {
        fullName: 'Sami Samsoum',
        email: 'sami@gmail.com',
        password: '******',
    };
    const { t } = useTranslation();
    // États pour gérer les champs du formulaire
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Fonctions de gestion des changements des champs
    const handleFullNameChange = (e) => {
        setNewFullName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Fonction de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique de soumission du formulaire
        console.log('Formulaire soumis !');
        // Réinitialiser les états avec les données de l'utilisateur
        setFullName(newFullName || user.fullName);
        setEmail(newEmail || user.email);
        setPassword(newPassword || user.password);
        setNewFullName('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };


    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='d-flex justify-content-between align-items-center align-content-center mb-5 mt-3'>
                    <div className='title'>
                        <h2>{t('profile.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className='profile-page'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex flex-column'>
                                <div className='profile-forms'>
                                    <div className='profile-form'>
                                        <label className='prof-label'>
                                            <div className='prof-element'>
                                                <div className='profile-label'>
                                                    {t('profile.email')}:
                                                </div>
                                                <div>
                                                    <p className='current'>{email}</p>
                                                    <p className='new-label'>{t('profile.newEmail')}:</p>
                                                    <input className='profile-input' type="email" value={newEmail} onChange={handleEmailChange} />
                                                </div>
                                            </div>
                                        </label>
                                        <br />
                                        <label className='prof-label'>
                                            <div className='prof-element'>
                                                <div className='profile-label'>
                                                    {t('profile.password')}:
                                                </div>
                                                <div>
                                                    <p className='current'>{password}</p>
                                                    <p className='new-label'>{t('profile.newPassword')}:</p>
                                                    <input className='profile-input' type="password" value={newPassword} onChange={handlePasswordChange} />
                                                    <p className='new-label'> {t('profile.confirmPassword')}:</p>
                                                    <input className='profile-input' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                                </div>
                                            </div>
                                        </label>
                                        <br />
                                    </div>
                                </div>
                                <div className='profile-btns1'>
                                    <button className='reset-btn1' type="button" onClick={() => {
                                        setNewEmail('');
                                        setNewPassword('');
                                        setConfirmPassword('');
                                    }}>{t('profile.cancel')}</button>
                                    <button className='save-btn1' type="submit">{t('profile.save')}</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default AdminProfile;
