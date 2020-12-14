import React from "react";
import {BrowserRouter, Route} from 'react-router-dom'
import {LogIn} from "../pages/LogIn/LogIn";
import {Content} from "../components/layout/Content";

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path={'/login'}>
                <LogIn/>
            </Route>
            <Route exact path={'/'}>
                <Content/>
            </Route>
        </BrowserRouter>
    )
}
