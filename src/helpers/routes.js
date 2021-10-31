import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const isUserExist = (user) => user.userId && user.userId.length > 0

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (isUserExist(user)) {
          return <Redirect to={{ pathname: loggedInPath }} />
        }
        if (!isUserExist(user)) {
          return children
        }
        return null
      }}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isUserExist(user)) {
          return children
        }
        if (!isUserExist(user)) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.SIGN_IN,
                state: { from: location },
              }}
            />
          )
        }
        return null
      }}
    />
  )
}
