import React, {createContext, useState} from 'react';
import {useProject} from "../hooks";

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({children}) => {

    const {selectedProject, setSelectedProject} = useState('INBOX');

    return (
        <SelectedProjectProvider.Provider value={{selectedProject, setSelectedProject}}>
            {children}
        </SelectedProjectProvider.Provider>
    )
}

export const useSelectedProjectsValue = () => useProject(SelectedProjectContext)

