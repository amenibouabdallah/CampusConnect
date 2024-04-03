import React, { useState, useEffect } from 'react';
import './Transport-tab.css';
import NavigationMenu from '../../shared/Navbar/Navbar';

function TransportTableUser() {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('transportData')) || [{ id: 1, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: false }]);

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='tab'>

                <table className="table1">
                    {/* Table header */}
                    <thead>
                        {/* Table header rows */}
                        <tr>
                            {/* Table header cells */}
                            <th rowSpan="2">Ligne</th>
                            <th rowSpan="2">Destination</th>
                            <th colSpan="2">Premier départ</th>
                            <th colSpan="2">Dernier départ</th>
                            <th rowSpan="2">Fréquence</th>
                        </tr>
                        <tr>
                            <th>Vers station</th>
                            <th>Vers banlieue</th>
                            <th>Vers station</th>
                            <th>Vers banlieue</th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                        {/* Table rows */}
                        {data.map(item => (
                            <tr key={item.id}>
                                {/* Table cells */}
                                <td>{item.ligne}</td>
                                <td>{item.destination}</td>
                                <td>{item.premierDepartStation}</td>
                                <td>{item.premierDepartBanlieue}</td>
                                <td>{item.dernierDepartStation}</td>
                                <td>{item.dernierDepartBanlieue}</td>
                                <td>{item.frequence}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default TransportTableUser;
