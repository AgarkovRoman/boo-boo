import React from "react";
import {FaAdjust} from 'react-icons/fa'

export const Header = () => {
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="" alt="myNotion"/>
                </div>
                <div className="settings">
                    <ul>
                        <li>+</li>
                        <li>
                            <FaAdjust/>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
