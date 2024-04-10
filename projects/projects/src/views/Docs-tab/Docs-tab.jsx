import React, { useState } from 'react';
import NavigationMenu from '../../shared/Navbar/Navbar';
import trash from '../../assets/images/trash.png';
import refuse from '../../assets/images/Refuser.png';
import approuver from '../../assets/images/Approuver.png';
import dateUp from '../../assets/images/calendar-up.png';
import dateDown from '../../assets/images/calendar-down.png';
import approve from '../../assets/images/approve.png';
import supprimer from '../../assets/images/supprimer.png';
import reject from '../../assets/images/reject.png';
import './Docs-tab.css'



const fakeData = [
    { id: 1, name: 'Algèbre', creationDate: '2024-04-09T10:30:00', submissionDate: '2024-04-09T10:30:00', submittedBy: 'John Doe', documentType: 'Relevé des notes', status: 'Accepted' },
    { id: 2, name: 'Conditionnel', creationDate: '2024-04-08T15:45:00', submissionDate: '2024-04-08T15:45:00', submittedBy: 'Jane Smith', documentType: 'Annonce', status: 'Pending' },
    { id: 3, name: 'Scrum', creationDate: '2024-04-07T09:20:00', submissionDate: '2024-04-07T09:20:00', submittedBy: 'Alice Johnson', documentType: 'Emploi du temps', status: 'Accepted' },
    { id: 4, name: 'Programmation', creationDate: '2024-04-06T11:55:00', submissionDate: '2024-04-06T11:55:00', submittedBy: 'Bob Brown', documentType: 'Relevé des notes', status: 'Pending' },
    { id: 5, name: 'Géométrie', creationDate: '2024-04-05T16:30:00', submissionDate: '2024-04-05T16:30:00', submittedBy: 'Eve Wilson', documentType: 'Annonce', status: 'Accepted' },
    { id: 6, name: 'Probabilité', creationDate: '2024-04-04T13:10:00', submissionDate: '2024-04-04T13:10:00', submittedBy: 'Alex Miller', documentType: 'Emploi du temps', status: 'Pending' },
    { id: 7, name: 'Anglais', creationDate: '2024-04-03T14:25:00', submissionDate: '2024-04-03T14:25:00', submittedBy: 'David Clark', documentType: 'Relevé des notes', status: 'Accepted' },
    { id: 8, name: 'Document8', creationDate: '2024-04-02T10:40:00', submissionDate: '2024-04-02T10:40:00', submittedBy: 'Sarah White', documentType: 'Annonce', status: 'Pending' },
    { id: 9, name: 'Document9', creationDate: '2024-04-01T08:15:00', submissionDate: '2024-04-01T08:15:00', submittedBy: 'Michael Davis', documentType: 'Emploi du temps', status: 'Accepted' },
    { id: 10, name: 'Document10', creationDate: '2024-03-31T17:50:00', submissionDate: '2024-03-31T17:50:00', submittedBy: 'Jessica Taylor', documentType: 'Relevé des notes', status: 'Pending' },
    { id: 11, name: 'Document11', creationDate: '2024-03-30T12:35:00', submissionDate: '2024-03-30T12:35:00', submittedBy: 'William Brown', documentType: 'Annonce', status: 'Accepted' },
    { id: 12, name: 'Document12', creationDate: '2024-03-29T09:10:00', submissionDate: '2024-03-29T09:10:00', submittedBy: 'Emily Johnson', documentType: 'Emploi du temps', status: 'Pending' }
];



const DocsUserTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isStatusFiltered, setIsStatusFiltered] = useState(false);

    const downloadDocument = (docId) => {
        // Logic to download the document with id = docId
        console.log(`Downloading document with id ${docId}`);
    };

    const filteredData = fakeData.filter((doc) => {
        const nameMatch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        const submittedByMatch = doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus !== 'All' && doc.status !== filterStatus) {
            return false;
        }
        if (filterType !== 'All' && doc.documentType !== filterType) {
            return false;
        }
        if (searchTerm && !(nameMatch || submittedByMatch)) {
            return false;
        }
        return true;
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortColumn) {
            if (a[sortColumn] < b[sortColumn]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }
        return 0;
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
        setIsNameSorted((prevState) => !prevState);
        setIsStatusFiltered((prevState) => !prevState);
    };

    return (
        <div className='usermenu'>
            <div>
                <NavigationMenu />
            </div>
            <div className='resto-tab'>
                <div className='recherche-nb'>
                    <div className='recherche-wrapper'>
                        <input
                            className='recherche'
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icone-recherche" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>

                    <div>
                        <span className='nb-total'>Nombre total de documents : {sortedData.length}</span>
                    </div>
                </div>
                {/* Filters */}
                <div className='d-flex justify-content-around mb-2 mt-4 filters'>
                    <button className='filter name-filter' onClick={() => handleSort('name')}>
                        {isNameSorted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                                <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z" />
                                <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z" />
                                <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z" />
                                <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                            </svg>

                        )}
                    </button>

                    <button className='filter date-filter' onClick={() => handleSort('creationDate')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    <button className='filter date-filter' onClick={() => handleSort('submissionDate')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    <select className='filter select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All" >Tous les statuts</option>
                        <option value="Pending">En attente</option>
                        <option value="Active">Approuvé</option>
                    </select>
                    <select className='filter select-filter' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="All" >Tous les types</option>
                        <option value="Relevé des notes">Relevé des notes</option>
                        <option value="Emploi du temps">Emploi du temps</option>
                        <option value="Annonce">Annonce</option>
                    </select>
                </div>
                {/* Table */}
                <div className='d-flex justify-content-center users-tab-wrapper'>
                    <table className='users-tab'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nom du document</th>
                                <th>Date de création</th>
                                <th>Date de dépôt</th>
                                <th>Statut du document</th>
                                <th>Type du document</th>
                                <th>Déposé par</th>
                                <th>Gestion des documents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((doc) => (
                                <tr key={doc.id} >
                                    <td ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFDA6F" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                    </svg></td>
                                    <td >{doc.name}</td>
                                    <td >{doc.creationDate}</td>
                                    <td >{doc.submissionDate}</td>
                                    <td >{doc.status}</td>
                                    <td >{doc.documentType}</td>
                                    <td >{doc.submittedBy}</td>
                                    <td>
                                        <button className='gestion-btn' onClick={() => downloadDocument(doc.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2D60B1" class="bi bi-download" viewBox="0 0 16 16">
                                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                        </svg></button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default DocsUserTable;

