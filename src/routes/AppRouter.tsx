import React, {useState} from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {SignIn} from "../pages/SignIn/SignIn";
import {Content} from "../components/layout/Content";
import {Header} from "../components/layout/Header";
import {SignUp} from "../pages/SignUp/SignUp";
import * as ROUTER from '../constants/routes'

export const AppRouter: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <BrowserRouter>
            <main className={darkMode ? 'darkmode' : ''} data-testid='application'>
                <Route exact path={ROUTER.SIGN_IN}><SignIn/></Route>
                <Route exact path={ROUTER.SIGN_UP}><SignUp/></Route>
                <Route exact path={ROUTER.HOME}>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Content/>
                </Route>
            </main>
        </BrowserRouter>
    )
}
