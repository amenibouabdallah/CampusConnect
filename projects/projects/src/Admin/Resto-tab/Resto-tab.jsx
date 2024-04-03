import React, { useState, useEffect } from 'react';
import './Resto-tab.css';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';
import { useMenu } from '../../shared/MenuContext';

const MealTable = () => {
    const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        // Add code here to change the language of the application
    };
    const { menuData, updateMenuData } = useMenu();

    const [lundiDejeuner, setLundiDejeuner] = useState('');
    const [mardiDejeuner, setMardiDejeuner] = useState('');
    const [mercrediDejeuner, setMercrediDejeuner] = useState('');
    const [jeudiDejeuner, setJeudiDejeuner] = useState('');
    const [vendrediDejeuner, setVendrediDejeuner] = useState('');
    const [samediDejeuner, setSamediDejeuner] = useState('');
    const [dimancheDejeuner, setDimancheDejeuner] = useState('');

    const [lundiDiner, setLundiDiner] = useState('');
    const [mardiDiner, setMardiDiner] = useState('');
    const [mercrediDiner, setMercrediDiner] = useState('');
    const [jeudiDiner, setJeudiDiner] = useState('');
    const [vendrediDiner, setVendrediDiner] = useState('');
    const [samediDiner, setSamediDiner] = useState('');
    const [dimancheDiner, setDimancheDiner] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Charger les données des textarea à partir de localStorage lors du chargement de la page
        const savedData = JSON.parse(localStorage.getItem('mealData')) || {};
        setLundiDejeuner(savedData.lundiDejeuner || '');
        setMardiDejeuner(savedData.mardiDejeuner || '');
        setMercrediDejeuner(savedData.mercrediDejeuner || '');
        setJeudiDejeuner(savedData.jeudiDejeuner || '');
        setVendrediDejeuner(savedData.vendrediDejeuner || '');
        setSamediDejeuner(savedData.samediDejeuner || '');
        setDimancheDejeuner(savedData.dimancheDejeuner || '');
        setLundiDiner(savedData.lundiDiner || '');
        setMardiDiner(savedData.mardiDiner || '');
        setMercrediDiner(savedData.mercrediDiner || '');
        setJeudiDiner(savedData.jeudiDiner || '');
        setVendrediDiner(savedData.vendrediDiner || '');
        setSamediDiner(savedData.samediDiner || '');
        setDimancheDiner(savedData.dimancheDiner || '');
    }, []);

    const data = {
        lundiDejeuner,
        mardiDejeuner,
        mercrediDejeuner,
        jeudiDejeuner,
        vendrediDejeuner,
        samediDejeuner,
        dimancheDejeuner,
        lundiDiner,
        mardiDiner,
        mercrediDiner,
        jeudiDiner,
        vendrediDiner,
        samediDiner,
        dimancheDiner,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        if (isFormValid()) {
            updateMenuData(data); // Update menu data in context
            // Sauvegarder les données dans localStorage
            localStorage.setItem('mealData', JSON.stringify(data));
        } else {
            setShowAlert(true);
        }
    };

    const isFormValid = () => {
        const requiredFields = [
            lundiDejeuner, mardiDejeuner, mercrediDejeuner, jeudiDejeuner, vendrediDejeuner, samediDejeuner, dimancheDejeuner,
            lundiDiner, mardiDiner, mercrediDiner, jeudiDiner, vendrediDiner, samediDiner, dimancheDiner,
        ];
        return requiredFields.every(field => field.trim() !== '');
    };

    return (
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='d-flex justify-content-between align-items-center align-content-center mb-5 mt-3'>
                    <div className='title'>
                        <h2>Menu restaurant de la semaine</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown currentLang={currentLang} changeLanguage={changeLanguage} />
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <form className='d-flex flex-column align-items-center justify-content-center' onSubmit={handleSubmit}>
                        <table className='meal-tab'>
                            <thead>
                                <tr>
                                    <th className='semi-thead'>Repas</th>
                                    <th>Lundi</th>
                                    <th>Mardi</th>
                                    <th>Mercredi</th>
                                    <th>Jeudi</th>
                                    <th>Vendredi</th>
                                    <th>Samedi</th>
                                    <th>Dimanche</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='semi-thead'>Déjeuner</td>
                                    <td><textarea value={lundiDejeuner} onChange={(e) => setLundiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={mardiDejeuner} onChange={(e) => setMardiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={mercrediDejeuner} onChange={(e) => setMercrediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={jeudiDejeuner} onChange={(e) => setJeudiDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={vendrediDejeuner} onChange={(e) => setVendrediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={samediDejeuner} onChange={(e) => setSamediDejeuner(e.target.value)} required /></td>
                                    <td><textarea value={dimancheDejeuner} onChange={(e) => setDimancheDejeuner(e.target.value)} required /></td>
                                </tr>
                                <tr>
                                    <td className='semi-thead'>Dîner</td>
                                    <td><textarea value={lundiDiner} onChange={(e) => setLundiDiner(e.target.value)} required /></td>
                                    <td><textarea value={mardiDiner} onChange={(e) => setMardiDiner(e.target.value)} required /></td>
                                    <td><textarea value={mercrediDiner} onChange={(e) => setMercrediDiner(e.target.value)} required /></td>
                                    <td><textarea value={jeudiDiner} onChange={(e) => setJeudiDiner(e.target.value)} required /></td>
                                    <td><textarea value={vendrediDiner} onChange={(e) => setVendrediDiner(e.target.value)} required /></td>
                                    <td><textarea value={samediDiner} onChange={(e) => setSamediDiner(e.target.value)} required /></td>
                                    <td><textarea value={dimancheDiner} onChange={(e) => setDimancheDiner(e.target.value)} required /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="alert alert-danger" role="alert" style={{ display: isSubmitted && !isFormValid() ? 'block' : 'none' }}>
                            Veuillez remplir tous les champs.
                        </div>
                        <div className='sub-button'>
                            <button type="submit" className="submit">
                                Valider
                            </button>
                            <div className='other'></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};


export default MealTable;
