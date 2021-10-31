import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SignIn } from '../pages/SignIn/SignIn'
import { SignUp } from '../pages/SignUp/SignUp'
import * as ROUTES from '../constants/routes'
import { IsUserRedirect, ProtectedRoute } from '../helpers/routes'
import { HomePage } from '../pages/HomePage/HomePage'
import { BooBoo } from '../pages/BooBoo/BooBoo'
import { getUser } from '../redux/auth/auth-selectors'
import { AuthStateI } from '../redux/auth/auth-types'

export const AppRouter: React.FC = () => {
  const user = useSelector((state: AuthStateI) => getUser(state))

  return (
    <BrowserRouter>
      <main data-testid="application">
        <Switch>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_IN} exact>
            <SignIn />
          </IsUserRedirect>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_UP} exact>
            <SignUp />
          </IsUserRedirect>
          <ProtectedRoute user={user} path={ROUTES.APP} exact>
            <BooBoo userId={user.userId} />
          </ProtectedRoute>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.HOME} exact>
            <HomePage />
          </IsUserRedirect>
        </Switch>
      </main>
    </BrowserRouter>
  )
}
