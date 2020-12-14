import React, {useState} from 'react';
import './App.scss';
import {Header} from "./components/layout/Header";
import {ProjectsProvider, SelectedProjectProvider} from "./context";
import {AppRouter} from "./routes/AppRouter";

export const App = ({darkModeDefault = false}) => {

    const [darkMode, setDarkMode] = useState(darkModeDefault)

    return (
        <SelectedProjectProvider>
            <ProjectsProvider>
                <main data-testid='application'
                      className={darkMode ? 'darkmode' : null}
                >
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <AppRouter/>
                </main>
            </ProjectsProvider>
        </SelectedProjectProvider>
    )
}
