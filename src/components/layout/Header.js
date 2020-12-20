import React, {useContext, useState} from "react";
import {FaAdjust, FaSignOutAlt, FaPlus} from 'react-icons/fa';
import {AddTask} from "../AddTask";
import {FirebaseContext} from "../../context/firebase";

export const Header = ({darkMode, setDarkMode}) => {
    const [shouldShowMain, setShouldShowMain] = useState(false)
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)
    const {firebase} = useContext(FirebaseContext)

    const logOutHandler = () => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src={"/images/logo.png"} alt="myNotion"/>
                </div>
                <div className="settings">
                    <ul>
                        <li
                            aria-label='Quick add task'
                            data-testid="quick-add-task-action"
                            className="settings__item">
                            <button
                                type='button'
                                onClick={() => {
                                    setShowQuickAddTask(true)
                                    setShouldShowMain(true)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setShowQuickAddTask(true)
                                        setShouldShowMain(true)
                                    }
                                }}><FaPlus/>
                            </button>
                        </li>
                        <li
                            aria-label='Toggle dark mode'
                            data-testid="dark-mode-action"
                            className="settings__item"
                        >
                            <button
                                type='button'
                                onClick={() => setDarkMode(!darkMode)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') setDarkMode(!darkMode)
                                }}
                            >
                                <FaAdjust/>
                            </button>
                        </li>
                        <li
                            aria-label='Sign out'
                            data-testid=""
                            className="settings__item"
                        >
                            <button
                                type='button'
                                onClick={() => logOutHandler()}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') logOutHandler()
                                }}
                            ><FaSignOutAlt/></button>


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
