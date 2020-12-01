import React, {useState} from 'react';
import {useProjectsValue, useSelectedProjectsValue} from "../context";
import {IndividualProject} from "./IndividualProject";

export const Projects = ({activeNull = true}) => {
    const [active, setActive] = useState(activeNull)
    const {setSelectedProject} = useSelectedProjectsValue()
    const {projects} = useProjectsValue()

    return (
        projects && projects.map(project => (
            <li
                key={project.projectId}
                data-doc-id={project.docId}
                data-testid='project-action-parent'
                className={active === project.projectId
                        ? 'active sidebar__project'
                        : 'sidebar__project'}
            >
                <div
                    data-testid='project-action'
                    aria-label='Add task'
                    role='button'
                    aria-label={`Select ${project.name} as the task project`}
                    tabIndex={0}
                    onClick={() => {
                        setActive(project.projectId)
                        setSelectedProject(project.projectId)
                    }}
                    onKeyDown={() => {
                        setActive(project.projectId)
                        setSelectedProject(project.projectId)
                    }}
                >
                    <IndividualProject project={project}/>
                </div>
            </li>
        ))
    )
}
