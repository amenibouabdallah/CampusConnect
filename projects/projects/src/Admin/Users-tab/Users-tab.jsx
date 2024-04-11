import React, { useState } from 'react';
import LanguageDropdown from '../../shared/lang-dropdown/lang-dropdown';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../shared/Sidebar/Sidebar';
import trash from '../../assets/images/trash.png';
import refuse from '../../assets/images/Refuser.png';
import approuver from '../../assets/images/Approuver.png';
import dateUp from '../../assets/images/calendar-up.png';
import dateDown from '../../assets/images/calendar-down.png';
import approve from '../../assets/images/approve.png';
import supprimer from '../../assets/images/supprimer.png';
import reject from '../../assets/images/reject.png';
import profile from '../../assets/images/profile.png';
import './Users-tab.css';

const fakeData = [
    { id: 1, name: 'John Doe', status: 'Pending', userType: 'Student', lastVisit: '2024-04-09T10:30:00', profilePicture: profile, email: 'john.doe@example.com', university: 'FST' },
    { id: 2, name: 'Jane Smith', status: 'Active', userType: 'Teacher', lastVisit: '2024-04-08T15:45:00', profilePicture: profile, email: 'jane.smith@example.com', university: 'FSEG' },
    { id: 3, name: 'Alice Johnson', status: 'Active', userType: 'Student', lastVisit: '2024-04-07T09:20:00', profilePicture: profile, email: 'alice.johnson@example.com', university: 'ENIT' },
    { id: 4, name: 'Bob Brown', status: 'Pending', userType: 'Teacher', lastVisit: '2024-04-06T11:55:00', profilePicture: profile, email: 'bob.brown@example.com', university: 'ENIT' },
    { id: 5, name: 'Eve Wilson', status: 'Active', userType: 'Student', lastVisit: '2024-04-05T16:30:00', profilePicture: profile, email: 'eve.wilson@example.com', university: 'ENIT' },
    { id: 6, name: 'Alex Miller', status: 'Pending', userType: 'Teacher', lastVisit: '2024-04-04T13:10:00', profilePicture: profile, email: 'alex.miller@example.com', university: 'FST' },
    { id: 7, name: 'David Clark', status: 'Active', userType: 'Student', lastVisit: '2024-04-03T14:25:00', profilePicture: profile, email: 'david.clark@example.com', university: 'FSEG' },
    { id: 8, name: 'Sarah White', status: 'Pending', userType: 'Teacher', lastVisit: '2024-04-02T10:40:00', profilePicture: profile, email: 'sarah.white@example.com', university: 'FST' },
    { id: 9, name: 'Michael Davis', status: 'Active', userType: 'Student', lastVisit: '2024-04-01T08:15:00', profilePicture: profile, email: 'michael.davis@example.com', university: 'FST' },
    { id: 10, name: 'Jessica Taylor', status: 'Pending', userType: 'Teacher', lastVisit: '2024-03-31T17:50:00', profilePicture: profile, email: 'jessica.taylor@example.com', university: 'FSEG' },
    { id: 11, name: 'William Brown', status: 'Active', userType: 'Student', lastVisit: '2024-03-30T12:35:00', profilePicture: profile, email: 'william.brown@example.com', university: 'FSEG' },
    { id: 12, name: 'Emily Johnson', status: 'Pending', userType: 'Teacher', lastVisit: '2024-03-29T09:10:00', profilePicture: profile, email: 'emily.johnson@example.com', university: 'FST' }
];

const UsersTable = () => {
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
    const [userIdToConfirm, setUserIdToConfirm] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleActionConfirmation = (action, id) => {
        if (action === 'accept') {
            setShowAcceptConfirmation(true);
        } else if (action === 'reject') {
            setShowRejectConfirmation(true);
        } else if (action === 'delete') {
            setShowDeleteConfirmation(true);
        }
        setUserIdToConfirm(id);
    };
    const handleRowClick = (userId) => {
        setSelectedUserId(userId);
        setShowPopup(true);
    };

    const handleConfirmAction = (action) => {
        // Implement logic based on the action
        if (action === 'accept') {
            console.log(`Accepted user with ID ${userIdToConfirm}`);
        } else if (action === 'reject') {
            console.log(`Rejected user with ID ${userIdToConfirm}`);
        } else if (action === 'delete') {
            console.log(`Deleted user with ID ${userIdToConfirm}`);
        }
        hideAllConfirmations();
    };

    const hideAllConfirmations = () => {
        setShowAcceptConfirmation(false);
        setShowRejectConfirmation(false);
        setShowDeleteConfirmation(false);
        setUserIdToConfirm(null);
    };

    const handleCancelAction = () => {
        hideAllConfirmations();
    };

    const filteredData = fakeData.filter((user) => {
        if (filterStatus !== 'All' && user.status !== filterStatus) {
            return false;
        }
        if (filterType !== 'All' && user.userType !== filterType) {
            return false;
        }
        if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
        <div className='d-flex align-items-center align-content-center'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='resto-tab'>
                <div className='d-flex justify-content-between align-items-center align-content-center mb-5 mt-3'>
                    <div className='title'>
                        <h2>{t('usersTab.title')}</h2>
                    </div>
                    <div className='lang'>
                        <LanguageDropdown className="lang-bg-gris" />
                    </div>
                </div>
                {/* Search and Total Users */}
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
                        <span className='nb-total'>{t('usersTab.totalUsersCount', { count: sortedData.length })}</span>

                    </div>
                </div>
                {/* Filters */}
                <div className='d-flex justify-content-center mb-2 mt-4'>
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


                    <button className='filter date-filter' onClick={() => handleSort('lastVisit')}>{isStatusFiltered ? (
                        <img className='plus-trash' src={dateDown} alt="" />
                    ) : (
                        <img className='plus-trash' src={dateUp} alt="" />

                    )}</button>
                    <select className='filter select-filter' value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">{t('usersTab.filters.allStatus')}</option>
                        <option value="Pending">{t('usersTab.filters.pending')}</option>
                        <option value="Active">{t('usersTab.filters.active')}</option>
                    </select>
                    <select className='filter select-filter' value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="All">{t('usersTab.filters.allTypes')}</option>
                        <option value="Student">{t('usersTab.filters.student')}</option>
                        <option value="Teacher">{t('usersTab.filters.teacher')}</option>
                    </select>

                </div>
                {/* Table */}
                <div className='d-flex justify-content-center users-tab-wrapper'>
                    <table className='users-tab'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{t('usersTab.headers.name')}</th>
                                <th>{t('usersTab.headers.accountStatus')}</th>
                                <th>{t('usersTab.headers.userType')}</th>
                                <th>{t('usersTab.headers.lastVisit')}</th>
                                <th>{t('usersTab.headers.manageUser')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((user) => (
                                <tr key={user.id} >
                                    <td onClick={() => handleRowClick(user.id)}><img className='prof-img-tab' src={user.profilePicture} alt="Profile" /></td>
                                    <td onClick={() => handleRowClick(user.id)}>{user.name}</td>
                                    <td onClick={() => handleRowClick(user.id)}>{user.status}</td>
                                    <td onClick={() => handleRowClick(user.id)}>{user.userType}</td>
                                    <td onClick={() => handleRowClick(user.id)}>{user.lastVisit}</td>
                                    <td>
                                        {user.status === 'Pending' && (
                                            <>
                                                <button className='gestion-btn' onClick={() => handleActionConfirmation('accept', user.id)}>
                                                    <img className='gestion-icon' src={approuver} alt="" />
                                                </button>
                                                <button className='gestion-btn' onClick={() => handleActionConfirmation('reject', user.id)}>
                                                    <img className='gestion-icon' src={refuse} alt="" />
                                                </button>
                                            </>
                                        )}
                                        <button className='gestion-btn' onClick={() => handleActionConfirmation('delete', user.id)}>
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
                                        <p className='conf-text'>{t('usersTab.popups.acceptMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={approve} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('accept')}>{t('usersTab.popups.acceptBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showRejectConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('usersTab.popups.rejectMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={reject} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('reject')}>{t('usersTab.popups.rejectBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showDeleteConfirmation && (
                        <div className="dark-overlay">
                            <div className="confirmation-popup d-flex flex-column align-items-center ">
                                <div className='d-flex flex-row-reverse justify-content-center align-items-center'>
                                    <div className='quest'>
                                        <p className='conf-text'>{t('usersTab.popups.deleteMsg')}</p>
                                    </div>
                                    <div className='confirmation-img'>
                                        <img className='conf-img' src={supprimer} alt="" />
                                    </div>
                                </div>
                                <div className="confirmation-buttons d-flex flex-row-reverse justify-content-center">
                                    <button className='conf-btn' onClick={() => handleConfirmAction('delete')}>{t('usersTab.popups.deleteBtn')}</button>
                                    <button className='ann-btn' onClick={handleCancelAction}>{t('usersTab.popups.cancelBtn')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showPopup && (
                        <div className="dark-overlay">
                            <div className='confirmation-popup1'>
                                {selectedUserId && (
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex justify-content-end mb-3'>
                                            <button className='gestion-btn' onClick={() => setShowPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg></button>
                                        </div>
                                        <div className='d-flex justify-content-around mb-5'>
                                            <div className='pop-img'>
                                                <img className='pop-prof-img' src={fakeData[selectedUserId - 1].profilePicture} alt="Profile" />
                                            </div>
                                            <div className='pop-up-right'>
                                                <p className='pop-nom'>{fakeData[selectedUserId - 1].name}</p>
                                                <p className='pop-type'>{fakeData[selectedUserId - 1].userType}</p>
                                            </div>
                                        </div>
                                        <div className='mb-5'>
                                            <p className='details'>{t('usersTab.popups.details')}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.id')}:</span>{fakeData[selectedUserId - 1].id}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.email')} :</span>{fakeData[selectedUserId - 1].email}</p>
                                            <p className='pop-detail'><span className='attr'>{t('usersTab.popups.university')} :</span>{fakeData[selectedUserId - 1].university}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default UsersTable;
