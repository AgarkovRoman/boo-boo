import React, {useState} from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {SignIn} from "../pages/SignIn/SignIn";
import {Content} from "../components/layout/Content";
import {Header} from "../components/layout/Header";
import {SignUp} from "../pages/SignUp/SignUp";

export const AppRouter: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <BrowserRouter>
            <main className={darkMode ? 'darkmode' : ''} data-testid='application'>
                <Route exact path={'/signin'}><SignIn/></Route>
                <Route exact path={'/signup'}><SignUp/></Route>
                <Route exact path={'/'}>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Content/>
                </Route>
            </main>
        </BrowserRouter>
    )
}
