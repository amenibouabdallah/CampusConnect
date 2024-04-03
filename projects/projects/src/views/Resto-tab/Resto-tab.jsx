import React from 'react';
import { useMenu } from '../../shared/MenuContext';
import NavigationMenu from '../../shared/Navbar/Navbar';
import './Resto-tab.css'

function UserMealTable() {
    const { menuData } = useMenu();
    console.log(menuData)

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='tab'>
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
                            <td>{menuData && menuData.lundiDejeuner}</td>
                            <td>{menuData && menuData.mardiDejeuner}</td>
                            <td>{menuData && menuData.mercrediDejeuner}</td>
                            <td>{menuData && menuData.jeudiDejeuner}</td>
                            <td>{menuData && menuData.vendrediDejeuner}</td>
                            <td>{menuData && menuData.samediDejeuner}</td>
                            <td>{menuData && menuData.dimancheDejeuner}</td>
                        </tr>
                        <tr>
                            <td className='semi-thead'>Dîner</td>
                            <td>{menuData && menuData.lundiDiner}</td>
                            <td>{menuData && menuData.mardiDiner}</td>
                            <td>{menuData && menuData.mercrediDiner}</td>
                            <td>{menuData && menuData.jeudiDiner}</td>
                            <td>{menuData && menuData.vendrediDiner}</td>
                            <td>{menuData && menuData.samediDiner}</td>
                            <td>{menuData && menuData.dimancheDiner}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserMealTable;
