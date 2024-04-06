import React, { useState } from 'react';
import profile from '../../assets/images/profile.png';
import './Profile.css'
import NavigationMenu from '../../shared/Navbar/Navbar';

const ProfilePage = () => {
    // Données fictives pour un utilisateur
    const user = {
        fullName: 'Sami Samsoum',
        email: 'sami@gmail.com',
        password: '******',
        profilePicture: profile,
    };

    // États pour gérer les champs du formulaire
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

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

    const handleProfilePictureChange = (e) => {
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
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
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='tab'>
                <div className='profile-page'>
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex flex-column'>
                            <div className='profile-forms'>
                                <div className='profile-img-btn'>
                                    {profilePicture && (
                                        <img src={profilePicture} alt="Profile" className="profile-picture" />
                                    )}
                                    <label htmlFor="fileInput" className="custom-file-upload">
                                        Modifier photo de profil
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className='profile-form'>
                                    <label className='prof-label'>
                                        <div className='prof-element'>
                                            <div className='profile-label'>
                                                Nom et Prénom:
                                            </div>
                                            <div>
                                                <p className='current'>{fullName}</p>
                                                <p className='new-label'>Nouveau nom et prénom:</p>
                                                <input className='profile-input' type="text" value={newFullName} onChange={handleFullNameChange} />
                                            </div>
                                        </div>

                                    </label>
                                    <br />
                                    <label className='prof-label'>
                                        <div className='prof-element'>
                                            <div className='profile-label'>
                                                Adresse Mail:
                                            </div>
                                            <div>
                                                <p className='current'>{email}</p>
                                                <p className='new-label'>Nouveau mail:</p>
                                                <input className='profile-input' type="email" value={newEmail} onChange={handleEmailChange} />
                                            </div>
                                        </div>
                                    </label>
                                    <br />
                                    <label className='prof-label'>
                                        <div className='prof-element'>
                                            <div className='profile-label'>
                                                Mot de passe:
                                            </div>
                                            <div>
                                                <p className='current'>{password}</p>
                                                <p className='new-label'>Nouveau mot de passe:</p>
                                                <input className='profile-input' type="password" value={newPassword} onChange={handlePasswordChange} />
                                                <p className='new-label'> Confirmer mot de passe:</p>
                                                <input className='profile-input' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                            </div>
                                        </div>
                                    </label>
                                    <br />
                                </div>
                            </div>
                            <div className='profile-btns'>
                                <button className='reset-btn' type="button" onClick={() => {
                                    setNewFullName('');
                                    setNewEmail('');
                                    setNewPassword('');
                                    setConfirmPassword('');
                                }}>Annuler</button>
                                <button className='save-btn' type="submit">Enregistrer</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    );
};

export default ProfilePage;