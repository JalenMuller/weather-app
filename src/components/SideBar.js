import React, {useEffect, useState} from 'react';
import {MoonFill} from 'react-bootstrap-icons';

function SideBar({showSidebar, toggleSidebar}) {
    const [theme, setTheme] = useState('light');

    function onClickOutside() {
        if (showSidebar) {
            toggleSidebar();
        }
    }

    function toggleDarkMode() {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme')) {
            setTheme('light');
            let themeName = localStorage.getItem('theme');
            document.documentElement.setAttribute('data-theme', themeName);
            setTheme(themeName);
        }
    }, []);
    return (
        <>
            <div className={showSidebar ? 'overlay' : ''} onMouseDown={onClickOutside}/>
            <div id={showSidebar ? "sb-active" : ""} className="sidebar">
                <ul className="sidebar-items">
                    <li>
                        <div onClick={toggleDarkMode}>
                            <MoonFill className="bootstrap-icon mr-15"/>
                            Dark mode
                        </div>
                        <label className="switch">
                            <input type="checkbox"
                                   onChange={e => {
                                   }}
                                   checked={theme === 'dark' && true}
                                   onClick={(e) => toggleDarkMode()}/>
                            <span className="slider round"/>
                        </label>
                    </li>
                    <li>Dummy #1</li>
                    <li>Dummy #2</li>
                    <li>Dummy #3</li>
                </ul>
            </div>
        </>
    );
}

export default SideBar;