import React from 'react'
import classes from './ProjectOverlay.module.scss'
import { projectsAPI } from '../../../api/api'

interface ProjectOverlayPropsI {
  setProject: (value: string) => void
  showProjectOverlay: boolean
  setShowProjectOverlay: (value: boolean) => void
}

export const ProjectOverlay: React.FC<ProjectOverlayPropsI> = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { data: projects } = projectsAPI.useGetAllProjectsByIdQuery('')

  return (
    <>
      {projects && showProjectOverlay && (
        <div className={classes.projectOverlay} data-testid="project-overlay">
          <ul className={classes.overlayList}>
            {projects.map((project) => (
              <li className={classes.listItem} key={project.id}>
                <div
                  className={classes.listElement}
                  data-testid="project-overlay-action"
                  onClick={() => {
                    setProject(project.id)
                    setShowProjectOverlay(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setProject(project.id)
                      setShowProjectOverlay(false)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Select the task project"
                >
                  {project.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
