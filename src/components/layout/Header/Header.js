import React, { useCallback, useState } from 'react'
import { FaAdjust, FaSignOutAlt, FaPlus, FaHamburger } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import classes from './Header.module.scss'
import { AddTask } from '../../AddTask/AddTask'
import { signOutThunkCreator } from '../../../redux/auth-reducer'

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)

  const dispatch = useDispatch()
  const signOutHandler = useCallback(() => dispatch(signOutThunkCreator()), [dispatch])

  return (
    <header className={classes.header} data-testid="header">
      <nav className={classes.navigation}>
        <div className={classes.burger} aria-label="Close/Open sidebar">
          <button className={classes.headerBtn} data-testid="Close/Open sidebar" type="button">
            <FaHamburger />
          </button>
        </div>
        <div className={classes.settings}>
          <ul>
            <li aria-label="Quick add task" className={classes.settingsItem}>
              <button
                type="button"
                data-testid="quick-add-task-action"
                className={classes.headerBtn}
                onClick={() => {
                  setShowQuickAddTask(true)
                  setShouldShowMain(true)
                }}
              >
                <FaPlus />
              </button>
            </li>
            <li aria-label="Toggle dark mode" className={classes.settingsItem}>
              <button
                type="button"
                data-testid="dark-mode-action"
                className={classes.headerBtn}
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaAdjust />
              </button>
            </li>
            <li aria-label="Sign out" className={classes.settingsItem}>
              <button
                type="button"
                className={classes.headerBtn}
                data-testid="sign-out"
                onClick={signOutHandler}
              >
                <FaSignOutAlt />
              </button>
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
