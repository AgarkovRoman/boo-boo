import React, {useContext, useState} from "react";
import {FaAdjust, FaSignOutAlt, FaPlus, FaHamburger} from 'react-icons/fa';
import classes from './Header.module.scss'
import {AddTask} from "../../AddTask/AddTask";
import {FirebaseContext} from "../../../context/firebase";

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
        <header className={classes.header} data-testid="header">
            <nav className={classes.navigation}>
                <div className={classes.burger}
                     aria-label='Close/Open sidebar'
                     data-testid="Close/Open sidebar"
                ><button className={classes.headerBtn}
                ><FaHamburger/></button>
                </div>
                <div className={classes.settings}>
                    <ul>
                        <li aria-label='Quick add task'
                            data-testid="quick-add-task-action"
                            className={classes.settingsItem}>
                            <button
                                type='button'
                                className={classes.headerBtn}
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
                            className={classes.settingsItem}
                        >
                            <button
                                type='button'
                                className={classes.headerBtn}
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
                            className={classes.settingsItem}
                        >
                            <button
                                type='button'
                                className={classes.headerBtn}
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
