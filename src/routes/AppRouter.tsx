import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { SignIn } from '../components/pages/SignIn/SignIn'
import { Content } from '../components/layout/Content/Content'
import { Header } from '../components/layout/Header/Header'
import { SignUp } from '../components/pages/SignUp/SignUp'
import * as ROUTES from '../constants/routes'
import { IsUserRedirect, ProtectedRoute } from '../helpers/routes'
import { useAuthListener } from '../hooks/useAuthListener'
import { HomePage } from '../components/pages/HomePage/HomePage'
import { BooBoo } from '../components/pages/BooBoo/BooBoo'

export const AppRouter: React.FC = () => {
  const { user } = useAuthListener()
  console.log('uer', user)
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
            <Header />
            <Content userId={user && user.uid && user.uid} />
            {/* <BooBoo userId={user && user.uid && user.uid} /> */}
          </ProtectedRoute>
          <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.HOME} exact>
            <HomePage />
          </IsUserRedirect>
        </Switch>
      </main>
    </BrowserRouter>
  )
}
