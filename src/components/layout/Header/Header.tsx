import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VscAdd, VscExtensions, VscSignOut } from 'react-icons/vsc'
import classes from './Header.module.scss'
import { AddTask } from '../../AddTask/AddTask'
import { signOutTC } from '../../../redux/auth/auth-reducer'

export const Header = () => {
  const [shouldShowMain, setShouldShowMain] = useState<boolean>(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState<boolean>(false)

  const dispatch = useDispatch()
  const signOutHandler = useCallback(() => dispatch(signOutTC()), [dispatch])

  return (
    <header className={classes.header} data-testid="header">
      <nav className={classes.navigation}>
        <div className={classes.burger} aria-label="Close/Open sidebar">
          <button className={classes.headerBtn} data-testid="Close/Open sidebar" type="button">
            <VscExtensions />
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
                <VscAdd />
              </button>
            </li>
            {/* <li aria-label="Toggle dark mode" className={classes.settingsItem}> */}
            {/*  <button */}
            {/*    type="button" */}
            {/*    data-testid="dark-mode-action" */}
            {/*    className={classes.headerBtn} */}
            {/*    onClick={() => setDarkMode(!darkMode)} */}
            {/*  > */}
            {/*    <VscColorMode /> */}
            {/*  </button> */}
            {/* </li> */}
            <li aria-label="Sign out" className={classes.settingsItem}>
              <button
                type="button"
                className={classes.headerBtn}
                data-testid="sign-out"
                onClick={signOutHandler}
              >
                <VscSignOut />
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
