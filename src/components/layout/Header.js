import React from "react";
import {FaAdjust} from 'react-icons/fa';

export const Header = () => {
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src={"/images/logo.png"} alt="myNotion"/>
                </div>
                <div className="settings">
                    <ul>
                        <li data-testid="quick-add-task-action" className="settings__add">+</li>
                        <li data-testid="dark-mode-action" className="settings__darkmode">
                            <FaAdjust/>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
