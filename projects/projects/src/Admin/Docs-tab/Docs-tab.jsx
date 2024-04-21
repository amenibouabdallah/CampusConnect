import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import Sidebar from '../../shared/Sidebar/Sidebar';
import trash from '../../assets/images/trash.png';
import refuse from '../../assets/images/Refuser.png';
import approuver from '../../assets/images/Approuver.png';
import dateUp from '../../assets/images/calendar-up.png';
import dateDown from '../../assets/images/calendar-down.png';
import approve from '../../assets/images/approve.png';
import supprimer from '../../assets/images/supprimer.png';
import reject from '../../assets/images/reject.png';
import './Docs-tab.css'
import '../Mobile-admin-style.css';
import axios from 'axios';







const DocsTable = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isStatusFiltered, setIsStatusFiltered] = useState(false);
    const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
    const [showRejectConfirmation, setShowRejectConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [docIdToConfirm, setDocIdToConfirm] = useState(null);
    const [docData, setDocData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                    }),
                };
                const response = await fetch('http://localhost:3000/admin/get-docs', requestOptions);
                const data = await response.json();
                setDocData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);
    const handleActionConfirmation = (action, id) => {
        if (action === 'accept') {
            setShowAcceptConfirmation(true);
        } else if (action === 'reject') {
            setShowRejectConfirmation(true);
        } else if (action === 'delete') {
            setShowDeleteConfirmation(true);
        }
        setDocIdToConfirm(id);
    };
    console.log(docIdToConfirm);


    const handleConfirmAction = async (action) => {
        // Implement logic based on the action
        try {
            const responseConfirmation = await axios.post('http://localhost:3000/admin/handle-confirm-action-docs', { action, docIdToConfirm });
            console.log(responseConfirmation.data);
            hideAllConfirmations();
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                }),
            };
            const updatedResponse = await fetch('http://localhost:3000/admin/get-docs', requestOptions);
            const data = await updatedResponse.json();
            setDocData(data);
        } catch (error) { console.error('Error handling confirmationaction:', error); }
    };

    const hideAllConfirmations = () => {
        setShowAcceptConfirmation(false);
        setShowRejectConfirmation(false);
        setShowDeleteConfirmation(false);
        setDocIdToConfirm(null);
    };

    const handleCancelAction = () => {
        hideAllConfirmations();
    };

    const filteredData = docData.filter((doc) => {
        if (filterStatus !== 'All' && doc.status !== filterStatus) {
            return false;
        }
        if (filterType !== 'All' && doc.docType !== filterType) {
            return false;
        }
        if (searchTerm && !doc.fullName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        return true;
    });

    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortColumn) {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];

            // Handle string comparison
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            // Compare the values
            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }

            // Return 0 if values are equal
            return 0;
        }
        // No sort column specified, return 0
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
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='admin-head'>
                    <div className='title1'>
                        <h2>{t('docsTab.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                {/* Search and Total docs */}
                <div className='recherche-nb'>
                    <div className='recherche-wrapper'>
                        <input
                            className='recherche'
                            type="text"
                            placeholder={t('docsTab.searchBarPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search icone-recherche" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </div>

                    <div>
                        <span className='nb-total'>{t('docsTab.totalDocuments', { count: sortedData.length })}</span>
                    </div>
                </div>
                {/* Filters */}
                <div className='filters'>
                    <div className='filters1'>
                        <button className='filter name-filter' onClick={() => handleSort('fullName')}>
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

                        <button className='filter date-filter' onClick={() => handleSort('selectedDate')}>{isStatusFiltered ? (
                            <img className='plus-trash' src={dateDown} alt="" />
                        ) : (
                            <img className='plus-trash' src={dateUp} alt="" />

                        )}</button>
                        <button className='filter date-filter' onClick={() => handleSort('uploadedAt')}>{isStatusFiltered ? (
                            <img className='plus-trash' src={dateDown} alt="" />
                        ) : (
                            <img className='plus-trash' src={dateUp} alt="" />

                        )}</button>
                    </div>
                    <div className='filters2'>
                        <select className='filter select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="All">{t('docsTab.filters.allStatus')}</option>
                            <option value="pending">{t('docsTab.filters.pending')}</option>
                            <option value="active">{t('docsTab.filters.approved')}</option>
                        </select>
                        <select className='filter select-filter' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="All">{t('docsTab.filters.allTypes')}</option>
                            <option value="cours">{t('docsTab.filters.cours')}</option>
                            <option value="tp">{t('docsTab.filters.tp')}</option>
                            <option value="td">{t('docsTab.filters.td')}</option>
                            <option value="exam">{t('docsTab.filters.exam')}</option>
                        </select>
                    </div>
                </div>
                {/* Table */}
                <div className='d-flex flex-column users-tab-wrapper'>
                    <table className='users-tab'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{t('docsTab.documentName')}</th>
                                <th>{t('docsTab.creationDate')}</th>
                                <th>{t('docsTab.submissionDate')}</th>
                                <th>{t('docsTab.documentStatus')}</th>
                                <th>{t('docsTab.documentType')}</th>
                                <th>{t('docsTab.submittedBy')}</th>
                                <th>{t('docsTab.documentManagement')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((doc) => (
                                <tr key={doc.id} >
                                    <td ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFDA6F" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                    </svg></td>
                                    <td >{doc.fullName}</td>
                                    <td >{doc.selectedDate}</td>
                                    <td >{doc.uploadedAt}</td>
                                    <td >{doc.status}</td>
                                    <td >{doc.docType}</td>
                                    <td >{doc.submittedBy}</td>
                                    <td>
                                        {doc.status === 'pending' && (
                                            <>
                                                <button className='gestion-btn' onClick={() => handleActionConfirmation('accept', doc._id)}>
                                                    <img className='gestion-icon' src={approuver} alt="" />
                                                </button>
                                                <button className='gestion-btn' onClick={() => handleActionConfirmation('reject', doc._id)}>
                                                    <img className='gestion-icon' src={refuse} alt="" />
                                                </button>
                                            </>
                                        )}
                                        <button className='gestion-btn' onClick={() => handleActionConfirmation('delete', doc._id)}>
                                            <img className='gestion-icon' src={trash} alt="" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showAcceptConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('docsTab.popups.acceptMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={approve} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('accept')}>{t('docsTab.popups.acceptBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('docsTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showRejectConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('docsTab.popups.rejectMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={reject} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('reject')}>{t('docsTab.popups.rejectBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('docsTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showDeleteConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('docsTab.popups.deleteMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={supprimer} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('delete')}>{t('docsTab.popups.deleteBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('docsTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default DocsTable;
