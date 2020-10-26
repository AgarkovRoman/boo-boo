import React from 'react';
import './App.scss';
import {Header} from "./components/layout/Header";
import {Content} from "./components/layout/Content";
import {ProjectProvider, SelectedProjectProvider} from "./context";

function App() {
    return (
        <SelectedProjectProvider>
            <ProjectProvider>
                <div className="App">
                    <Header/>
                    <Content/>
                </div>
            </ProjectProvider>
        </SelectedProjectProvider>
    );
}

export default App;
