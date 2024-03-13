import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import "./Navigation.css";

const Navigation: React.FC = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const navigationRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

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

    const isActiveLink = (path: string) => {
        const currentPath = location.pathname.split("/")[1];
        return (path === "" && location.search) || currentPath === path;
    };
    return (
        <div className="navigation" ref={navigationRef}>
            <nav>
                <ul className="links">
                    <li className={`link ${isActiveLink("") ? 'active' : ''}`}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={`link ${isActiveLink("saved-definitions") ? 'active' : ''}`}>
                        <Link to="/saved-definitions">Saved Definitions</Link>
                    </li>
                    <li className={`link ${isActiveLink("about") ? 'active' : ''}`}>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <a
                    href="https://github.com/AnsBenO/dictionary-app"
                    className="action_btn"
                    target="_blank"
                    rel="noreferrer"
                >
                    Git Hub
                </a>
                <button className={`toggle_btn ${!isHidden ? 'active' : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={isHidden ? (faBars as IconProp) : (faXmark as IconProp)} className="toggle-icon" />
                </button>
            </nav>
            <div className={`dropdown_menu ${!isHidden ? 'active' : ''}`}>
                <li className={`link ${isActiveLink("") ? 'active' : ''}`} onClick={handleClick}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`link ${isActiveLink("saved-definitions") ? 'active' : ''}`} onClick={handleClick}>
                    <Link to="/saved-definitions">Saved Definitions</Link>
                </li>
                <li className={`link ${isActiveLink("about") ? 'active' : ''}`} onClick={handleClick}>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <a
                        href="https://github.com/AnsBenO/dictionary-app"
                        className="action_btn"
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleClick}
                    >
                        Git Hub
                    </a>
                </li>
            </div>
        </div>
    );
};

export default Navigation;
