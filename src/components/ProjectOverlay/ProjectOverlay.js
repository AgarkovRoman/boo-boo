import React from 'react'
import './ProjectOverlay.scss'
import { useSelector } from 'react-redux'
import { getActiveProject } from '../../redux/projects-selectors'

export const ProjectOverlay = ({ setProject, showProjectOverlay, setShowProjectOverlay }) => {
  const projects = useSelector((state) => getActiveProject(state))

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId)
                  setShowProjectOverlay(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setProject(project.projectId)
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
    )
  )
}
