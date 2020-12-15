import React, {useState} from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {LogIn} from "../pages/LogIn/LogIn";
import {Content} from "../components/layout/Content";
import {Header} from "../components/layout/Header";

export const AppRouter: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <BrowserRouter>
            <main className={darkMode ? 'darkmode' : ''} data-testid='application'>
                <Route exact path={'/login'}>
                    <LogIn/>
                </Route>
                <Route exact path={'/'}>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Content/>
                </Route>
            </main>
        </BrowserRouter>
    )
}
