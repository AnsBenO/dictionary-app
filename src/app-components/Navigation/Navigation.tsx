import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "./Navigation.css";

const Navigation: React.FC = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const navigationRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsHidden(!isHidden);
    };
    const handleOutsideClick = (event: MouseEvent) => {
        if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) {
            setIsHidden(true);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


    return (
        <div className="navigation" ref={navigationRef} >
            <nav>
                <ul className="links">
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/saved-definitions">Saved Definitions</Link></li>
                    <li className='link'><Link to="/about">About</Link></li>
                </ul>
                <a
                    href="https://github.com/AnsBenO/dictionary-angular"
                    className="action_btn"
                    target="_blank"
                    rel="noreferrer"
                >
                    Git Hub
                </a>
                <div className={`toggle_btn ${!isHidden ? 'active' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={isHidden ? (faBars as IconProp) : (faXmark as IconProp)} className="toggle-icon" />
                </div>
            </nav>
            <div className={`dropdown_menu ${!isHidden ? 'active' : ''}`}>
                <li className='link'><Link to="/">Home</Link></li>
                <li className='link'><Link to="/saved-definitions">Saved Definitions</Link></li>
                <li className='link'><Link to="/about">About</Link></li>
                <li>
                    <a
                        href="https://github.com/AnsBenO/dictionary-angular"
                        className="action_btn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Git Hub
                    </a>
                </li>
            </div>
        </div>
    );
};

export default Navigation;
