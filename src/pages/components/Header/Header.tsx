import React, { useCallback, useState } from 'react'
import { VscAdd, VscExtensions, VscSignOut } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import classes from './Header.module.scss'
import { AddTask } from '../AddTask/AddTask'
import { UserIServer } from '../../../redux/auth/auth-types'
import { authAPI } from '../../../api/api'
import { signOutUser } from '../../../redux/auth/auth-reducer'

export const Header = () => {
  const [shouldShowMain, setShouldShowMain] = useState<boolean>(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState<boolean>(false)

  const dispatch = useDispatch()
  const [logOut] = authAPI.useLogOutMutation()

  const signOutHandler = useCallback(() => {
    const userFromLocalStorage: string | null = localStorage.getItem('authUser')
    if (typeof userFromLocalStorage === 'string' && userFromLocalStorage.length > 0) {
      const userFromLocalStorageParse: UserIServer = JSON.parse(userFromLocalStorage)
      logOut(userFromLocalStorageParse.refreshToken).then((res) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (res && res?.data?.success) {
          dispatch(signOutUser({ userId: '', userEmail: '', userName: '' }))
          localStorage.removeItem('authUser')
        }
      })
    }
  }, [])

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
