import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Projects.module.scss'
import { IndividualProject } from '../IndividualProject/IndividualProject'
import { setProject } from '../../redux/projects-reducer'

export const Projects = ({ activeNull = true }) => {
  const [active, setActive] = useState(activeNull)
  const dispatch = useDispatch()

  const projects = useSelector((state) => state.projects.allProjects)

  const selectProject = useCallback((project) => dispatch(setProject(project)), [dispatch])

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={`${classes.project} ${active === project.projectId ? classes.active : ''}`}
      >
        <div
          className={classes.projectItem}
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId)
            selectProject(project.projectId)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId)
              selectProject(project.projectId)
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  )
}
