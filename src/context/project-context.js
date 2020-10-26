import React, {createContext} from 'react';
import {useProject} from "../hooks";

export const ProjectsContext = createContext();
export const ProjectProvider = ({children}) => {

    const {projects, setProjects} = useProject();

    return (
        <ProjectProvider.Provider value={{projects, setProjects}}>
            {children}
        </ProjectProvider.Provider>
    )
}

export const useProjectsValue = () => useProject(ProjectsContext)
