import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './lang-dropdown.css'

function LanguageDropdown({ currentLang, changeLanguage }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" className="m-3 d-flex align-items-center justify-content-center">
                {currentLang === 'fr' ? (
                    <>
                        <span>Français</span>
                    </>
                ) : (
                    <>
                        <span>English</span>
                    </>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('fr')}>
                    <span>Français</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('en')}>
                    <span>English</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LanguageDropdown;
