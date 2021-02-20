import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SignIn } from '../components/pages/SignIn/SignIn'
import { Content } from '../components/layout/Content'
import { Header } from '../components/layout/Header/Header'
import { SignUp } from '../components/pages/SignUp/SignUp'
import * as ROUTES from '../constants/routes'
import { IsUserRedirect, ProtectedRoute } from '../helpers/routes'
import { useAuthListener } from '../hooks'
import { getAllProjectTC } from '../redux/projects-reducer'
import { getAllTasksTC } from '../redux/tasks-reducer'
import { getUserId } from '../redux/auth-selectors'

export const AppRouter: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const { user } = useAuthListener()

  const userId = useSelector((state) => getUserId(state))
  const dispatch = useDispatch()

  // Get all projects from back and set it in redux
  const getAllProjects = useCallback(() => dispatch(getAllProjectTC(userId)), [dispatch])
  const getAllTasks = useCallback(() => dispatch(getAllTasksTC(userId)), [dispatch])

  useEffect(() => {
    getAllProjects()
    getAllTasks()
  }, [dispatch, getAllProjects, getAllTasks])

  return (
    <BrowserRouter>
      <main className={darkMode ? 'darkmode' : ''} data-testid="application">
        <Switch>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_IN} exact>
            <SignIn />
          </IsUserRedirect>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_UP} exact>
            <SignUp />
          </IsUserRedirect>

          <ProtectedRoute user={user} path={ROUTES.APP} exact>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Content />
          </ProtectedRoute>

          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.HOME} exact>
            <h1>home page</h1>
          </IsUserRedirect>
        </Switch>
      </main>
    </BrowserRouter>
  )
}
