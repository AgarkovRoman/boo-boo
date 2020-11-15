import React, {useState} from "react";
import {FaAdjust} from 'react-icons/fa';
import {AddTask} from "../AddTask";

export const Header = ({darkMode, setDarkMode}) => {
    const [shouldShowMain, setShouldShowMain] = useState(false)
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)

    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src={"/images/logo.png"} alt="myNotion"/>
                </div>
                <div className="settings">
                    <ul>
                        <li
                            data-testid="quick-add-task-action"
                            className="settings__add"
                            onClick={() => {
                                setShowQuickAddTask(true)
                                setShouldShowMain(true)
                            }}
                        >+</li>
                        <li
                            onClick={() => setDarkMode(!darkMode)}
                            data-testid="dark-mode-action"
                            className="settings__darkmode"
                        >
                            <FaAdjust/>
                        </li>
                    </ul>
                </div>
            </nav>
            <AddTask
                showAddTaskMain={false}
                showShouldMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    )
}
