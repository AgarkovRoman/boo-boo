import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {SignIn} from "../pages/SignIn/SignIn";
import {Content} from "../components/layout/Content";
import {Header} from "../components/layout/Header";
import {SignUp} from "../pages/SignUp/SignUp";
import * as ROUTES from '../constants/routes'
import {IsUserRedirect, ProtectedRoute} from "../helpers/routes";
import {useAuthListener} from "../hooks";

export const AppRouter: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)
    const {user} = useAuthListener()

    return (
        <BrowserRouter>
            <main className={darkMode ? 'darkmode' : ''} data-testid='application'>
                <Switch>
                    <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_IN} exact>
                        <SignIn/>
                    </IsUserRedirect>
                    <IsUserRedirect user={user} loggedInPath={ROUTES.APP} path={ROUTES.SIGN_UP} exact>
                        <SignUp/>
                    </IsUserRedirect>

                    <ProtectedRoute user={user} path={ROUTES.APP} exact>
                        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                        <Content/>
                    </ProtectedRoute>

                    <Route path={ROUTES.HOME}>
                        <h1>home page</h1>
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    )
}
