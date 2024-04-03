// import React, { useState, useEffect } from 'react';
// import './Transport-tab.css';
// import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
// import Sidebar from '../../shared/Sidebar/Sidebar';
// import './test.css'
// function TransportTableReadOnly() {
//     const [currentLang, setCurrentLang] = useState('fr'); // Assuming 'fr' is the default language

//     const changeLanguage = (lang) => {
//         setCurrentLang(lang);
//         // Add code here to change the language of the application
//     };

//     const [data, setData] = useState(JSON.parse(localStorage.getItem('transportData')) || [{ id: 1, ligne: '', destination: '', premierDepartStation: '', premierDepartBanlieue: '', dernierDepartStation: '', dernierDepartBanlieue: '', frequence: '', isDirty: false }]);

//     return (
//         <div className='d-flex align-items-center align-content-center'>
//             <div className='sidebar'>
//                 <Sidebar />
//             </div>
//             <div className='resto-tab'>
//                 <div className='d-flex justify-content-between align-items-center align-content-center mb-5 mt-3'>
//                     <div className='title'>
//                         <h2>Horaires transports</h2>
//                     </div>
//                     <div className='lang'>
//                         <LanguageDropdown currentLang={currentLang} changeLanguage={changeLanguage} />
//                     </div>
//                 </div>
//                 <div className='d-flex justify-content-center'>
//                     <table className="table1">
//                         {/* Table header */}
//                         <thead>
//                             {/* Table header rows */}
//                             <tr>
//                                 {/* Table header cells */}
//                                 <th rowSpan="2">Ligne</th>
//                                 <th rowSpan="2">Destination</th>
//                                 <th colSpan="2">Premier départ</th>
//                                 <th colSpan="2">Dernier départ</th>
//                                 <th rowSpan="2">Fréquence</th>
//                             </tr>
//                             <tr>
//                                 <th>Vers station</th>
//                                 <th>Vers banlieue</th>
//                                 <th>Vers station</th>
//                                 <th>Vers banlieue</th>
//                             </tr>
//                         </thead>
//                         {/* Table body */}
//                         <tbody>
//                             {/* Table rows */}
//                             {data.map(item => (
//                                 <tr key={item.id}>
//                                     {/* Table cells */}
//                                     <td>{item.ligne}</td>
//                                     <td>{item.destination}</td>
//                                     <td>{item.premierDepartStation}</td>
//                                     <td>{item.premierDepartBanlieue}</td>
//                                     <td>{item.dernierDepartStation}</td>
//                                     <td>{item.dernierDepartBanlieue}</td>
//                                     <td>{item.frequence}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TransportTableReadOnly;
