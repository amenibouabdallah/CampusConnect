import React from 'react';
import logo from '../../assets/images/logo.png'
import Menu from '../../assets/images/Menu.png'
import Transport from '../../assets/images/Transport.png'
import Users from '../../assets/images/Users.png'
import Upload from '../../assets/images/Upload.png'
import Documents from '../../assets/images/Documents.png'
import adminprofile from '../../assets/images/admin-profile.png'
import './Sidebar.css'
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='Sidebar'>
            <div className='nav-item'>
                <Link to="/">
                    <img className='white-logo' src={logo} alt="" />
                </Link>
            </div>
            <div className='nav-items'>
                <Link className='nav-item' to="/admin/profile">

                    <img className='sidebar-icon' src={adminprofile} alt="" />

                    <p className='sidebar-item'>Profil</p>
                </Link>
                <Link className='nav-item' to="/admin/meals">

                    <img className='sidebar-icon' src={Users} alt="" />

                    <p className='sidebar-item'>Utilisateurs</p>
                </Link>
                <Link className='nav-item' to="/admin/meals">

                    <img className='sidebar-icon' src={Documents} alt="" />

                    <p className='sidebar-item'>Documents</p>
                </Link>
                <Link className='nav-item' to="/admin/meals">

                    <img className='sidebar-icon' src={Menu} alt="" />

                    <p className='sidebar-item'>Menu</p>
                </Link>
                <Link className='nav-item' to="/admin/transport">

                    <img className='sidebar-icon' src={Transport} alt="" />

                    <p className='sidebar-item'>Transport</p>
                </Link>
                <Link className='nav-item' to="/admin/upload">

                    <img className='sidebar-icon' src={Upload} alt="" />

                    <p className='sidebar-item'>Dépôt fichiers</p>
                </Link>
            </div>
        </div>

    );

};
export default Sidebar