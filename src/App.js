import React from 'react';
import './App.scss';
import 'normalize.css'
import {ProjectsProvider, SelectedProjectProvider} from "./context";
import {AppRouter} from "./routes/AppRouter";

export const App = () => {
    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <AppRouter/>
            </ProjectsProvider>
        </SelectedProjectProvider>
    )
}
